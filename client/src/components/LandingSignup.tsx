/**
 * LandingSignup — the email form for the dark CTA section on crisis/topic
 * landing pages. Replaces ten identical hand-rolled forms that set a
 * `submitted` flag without calling any API (the reader's email was silently
 * discarded). This one records the subscriber for real via
 * trpc.subscribers.subscribe and says only what actually happens.
 */
import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { trackNewsletterSignup } from "@/lib/telemetry";

export function LandingSignup({ source }: { source: string }) {
  const [email, setEmail] = useState("");
  // Count the conversion when the backend accepts it, not on submit.
  const subscribe = trpc.subscribers.subscribe.useMutation({
    onSuccess: (_data, variables) => trackNewsletterSignup(variables.source, variables.audienceType),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@") || subscribe.isPending) return;
    // Attribution: the page the form sat on, plus the audience the reader
    // self-selected earlier (SegmentedSignup persists it) if we have one.
    let audienceType: "skeptic" | "christian" | "pastor" | "exploring" | undefined;
    try {
      const stored = window.localStorage.getItem("livewell:audience");
      if (stored === "skeptic" || stored === "christian" || stored === "pastor" || stored === "exploring") {
        audienceType = stored;
      }
    } catch {
      /* private mode — attribution stays page-only */
    }
    subscribe.mutate({ email, source, audienceType });
  };

  if (subscribe.isSuccess) {
    return (
      <p role="status" style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--mustard)" }}>
        You're on the list. One essay a week, written slow.
      </p>
    );
  }

  return (
    <div style={{ maxWidth: "440px", margin: "0 auto" }}>
      <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px" }}>
        <input
          type="email"
          required
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          style={{ flex: 1, minWidth: 0, padding: "12px 16px", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)", color: "white", fontFamily: "var(--U)", fontSize: "16px", borderRadius: "3px", outline: "none" }}
        />
        <button
          type="submit"
          disabled={subscribe.isPending}
          style={{ background: "var(--mustard)", color: "var(--ink)", border: "none", padding: "12px 24px", fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", borderRadius: "3px", cursor: subscribe.isPending ? "wait" : "pointer", whiteSpace: "nowrap", opacity: subscribe.isPending ? 0.7 : 1 }}
        >
          {subscribe.isPending ? "Adding you…" : "Subscribe"}
        </button>
      </form>
      {subscribe.isError && (
        <p role="status" style={{ fontFamily: "var(--U)", fontSize: "13px", color: "rgba(255,255,255,0.75)", marginTop: "10px" }}>
          That didn't go through. Try again in a moment.
        </p>
      )}
    </div>
  );
}
