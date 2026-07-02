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

interface NewsletterSignupProps {
  variant?: "inline" | "footer" | "minimal";
  title?: string;
  description?: string;
  /** Where this signup was placed; helps with conversion attribution. */
  source?: string;
}

export function NewsletterSignup({
  variant = "inline",
  title = "One serious essay a week",
  description = "Theology that meets the actual Tuesday afternoon of marriage, money, parenting, and doubt. Written slow, sent once a week. No spam, ever.",
  source,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const toastCtx = useToast();
  const addToast = toastCtx?.addToast;
  const subscribe = trpc.subscribers.subscribe.useMutation({
    onSuccess: () => {
      addToast?.({
        type: "success",
        title: "Subscribed",
        message: "You're on the list. One essay a week, written slow.",
      });
      setEmail("");
    },
    onError: error => {
      addToast?.({
        type: "error",
        title: "Subscription failed",
        message: error.message || "Please try again later.",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    subscribe.mutate({ email });
    if (source && typeof window !== "undefined") {
      // best-effort attribution; safe to ignore failures
      try {
        window.dispatchEvent(
          new CustomEvent("newsletter_signup", { detail: { source } })
        );
      } catch {
        /* noop */
      }
    }
  };

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
        <div style={{ display: "flex", gap: "8px" }}>
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            aria-label="Email address"
            style={{
              flex: 1,
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
            {subscribe.isPending ? "…" : "Go"}
          </button>
        </div>
      </form>
    );
  }

  if (variant === "minimal") {
    return (
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: "8px", maxWidth: "420px" }}
      >
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          aria-label="Email address"
          style={{
            flex: 1,
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
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
        <input
          type="email"
          required
          placeholder="your@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
          aria-label="Email address"
          style={{
            flex: 1,
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
          {subscribe.isPending ? "Subscribing…" : "Subscribe"}
        </button>
      </form>
    </div>
  );
}

export default NewsletterSignup;
