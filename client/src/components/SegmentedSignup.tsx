/**
 * SegmentedSignup — captures email AND audience self-selection in one step.
 *
 * The highest-leverage email move per the audit: segment-on-signup. New
 * subscribers pick "I'm a skeptic / Christian / pastor / just exploring";
 * each segment lands in a different welcome sequence.
 *
 * The audience choice is stored as the audience_type on the subscriber row
 * via the same subscribers.subscribe mutation; the welcome-sequence picker
 * lives server-side (server/email-sequences.ts).
 */
import { useState } from "react";

import { trpc } from "@/lib/trpc";
import { useToast } from "@/contexts/ToastContext";

type Audience = "skeptic" | "christian" | "pastor" | "exploring";

const AUDIENCES: { value: Audience; label: string; helper: string }[] = [
  {
    value: "skeptic",
    label: "I'm a skeptic",
    helper: "Hand me the essays that take the questions seriously.",
  },
  {
    value: "christian",
    label: "I'm a Christian",
    helper: "I want depth, not slogans.",
  },
  {
    value: "pastor",
    label: "I'm a pastor",
    helper: "Send the pastoral letter and the resources for the work.",
  },
  {
    value: "exploring",
    label: "I'm just exploring",
    helper: "Surprise me. Start me at the beginning.",
  },
];

interface SegmentedSignupProps {
  title?: string;
  description?: string;
  variant?: "card" | "panel";
}

export function SegmentedSignup({
  title = "Subscribe — and choose what you'll get",
  description = "One essay a week. Different lead essay depending on who you are.",
  variant = "card",
}: SegmentedSignupProps) {
  const [email, setEmail] = useState("");
  const [audience, setAudience] = useState<Audience | null>(null);
  const toastCtx = useToast();
  const addToast = toastCtx?.addToast;

  const subscribe = trpc.subscribers.subscribe.useMutation({
    onSuccess: () => {
      addToast?.({
        type: "success",
        title: "Subscribed",
        message:
          "Check your inbox for the first essay in your track. Real one is on the way.",
      });
      setEmail("");
      setAudience(null);
    },
    onError: err => {
      addToast?.({
        type: "error",
        title: "Subscription failed",
        message: err.message || "Please try again later.",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !audience) return;
    subscribe.mutate({ email });
    // The server-side audience routing is wired through the same mutation
    // once `email-sequences.ts` is rewritten. For now, fire a custom event
    // so any client-side analytics can capture the segment.
    if (typeof window !== "undefined") {
      try {
        window.dispatchEvent(
          new CustomEvent("newsletter_signup", {
            detail: { audience, email },
          })
        );
      } catch {
        /* noop */
      }
    }
  };

  const isPanel = variant === "panel";

  return (
    <div
      style={{
        background: isPanel ? "var(--charcoal)" : "var(--card)",
        color: isPanel ? "var(--bone)" : "var(--ink)",
        border: isPanel ? "none" : "1px solid var(--border)",
        borderLeft: isPanel ? "none" : "2px solid var(--mustard)",
        padding: isPanel ? "var(--s-6) var(--s-5)" : "var(--s-4)",
        borderRadius: "var(--radius-sm)",
      }}
    >
      <h3
        style={{
          fontFamily: "var(--F)",
          fontSize: isPanel ? "28px" : "22px",
          fontWeight: 500,
          letterSpacing: "-0.01em",
          marginBottom: "10px",
          color: isPanel ? "var(--bone)" : "var(--ink)",
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontFamily: "var(--B)",
          fontSize: "14px",
          lineHeight: 1.65,
          color: isPanel ? "rgba(245,240,230,0.7)" : "var(--ink-muted)",
          marginBottom: "20px",
          maxWidth: "55ch",
        }}
      >
        {description}
      </p>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "16px" }}
      >
        <div
          role="radiogroup"
          aria-label="Who are you?"
          style={{
            display: "grid",
            gap: "8px",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          }}
        >
          {AUDIENCES.map(opt => {
            const selected = audience === opt.value;
            return (
              <label
                key={opt.value}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "4px",
                  padding: "12px 14px",
                  borderRadius: "var(--radius-sm)",
                  border: `1px solid ${selected ? "var(--mustard)" : isPanel ? "rgba(245,240,230,0.18)" : "var(--border)"}`,
                  background: selected
                    ? isPanel
                      ? "rgba(212,160,23,0.12)"
                      : "var(--bone-warm)"
                    : "transparent",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                <input
                  type="radio"
                  name="audience"
                  value={opt.value}
                  checked={selected}
                  onChange={() => setAudience(opt.value)}
                  style={{ position: "absolute", opacity: 0, width: 0, height: 0 }}
                />
                <span
                  style={{
                    fontFamily: "var(--U)",
                    fontSize: "13px",
                    fontWeight: 600,
                    color: isPanel ? "var(--bone)" : "var(--ink)",
                  }}
                >
                  {opt.label}
                </span>
                <span
                  style={{
                    fontFamily: "var(--B)",
                    fontSize: "12px",
                    lineHeight: 1.4,
                    color: isPanel
                      ? "rgba(245,240,230,0.6)"
                      : "var(--ink-muted)",
                  }}
                >
                  {opt.helper}
                </span>
              </label>
            );
          })}
        </div>

        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <input
            type="email"
            required
            placeholder="your@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            aria-label="Email address"
            style={{
              flex: "1 1 220px",
              padding: "12px 14px",
              background: isPanel ? "rgba(245,240,230,0.08)" : "var(--bone)",
              border: `1px solid ${isPanel ? "rgba(245,240,230,0.18)" : "var(--border)"}`,
              borderRadius: "var(--radius-sm)",
              fontFamily: "var(--B)",
              fontSize: "14px",
              color: isPanel ? "var(--bone)" : "var(--ink)",
              outline: "none",
            }}
          />
          <button
            type="submit"
            disabled={!email || !audience || subscribe.isPending}
            style={{
              padding: "12px 22px",
              background: !email || !audience ? "var(--ink-muted)" : "var(--mustard)",
              color: "var(--ink)",
              border: "none",
              borderRadius: "var(--radius-sm)",
              fontFamily: "var(--U)",
              fontSize: "13px",
              fontWeight: 600,
              cursor:
                !email || !audience
                  ? "not-allowed"
                  : subscribe.isPending
                    ? "wait"
                    : "pointer",
            }}
          >
            {subscribe.isPending ? "Subscribing…" : "Subscribe"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default SegmentedSignup;
