/**
 * SampleChapterForm — email-gated first-chapter download on book pages.
 *
 * The single highest-converting book-to-email mechanic in publishing
 * (Comer, Brené, Crouch all do it; almost no Christian author does
 * systematically). Posts to the same subscribers.subscribe mutation; the
 * server side wires the right welcome sequence based on the book slug.
 */
import { useState } from "react";
import { Download } from "lucide-react";

import { trpc } from "@/lib/trpc";
import { useToast } from "@/contexts/ToastContext";

interface SampleChapterFormProps {
  bookTitle: string;
  bookSlug: string;
  /** If known, used to immediately reveal the download. Otherwise emailed. */
  sampleUrl?: string | null;
}

export function SampleChapterForm({
  bookTitle,
  bookSlug,
  sampleUrl,
}: SampleChapterFormProps) {
  const [email, setEmail] = useState("");
  const [isPastor, setIsPastor] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const toastCtx = useToast();
  const addToast = toastCtx?.addToast;

  const subscribe = trpc.subscribers.subscribe.useMutation({
    onSuccess: () => {
      if (sampleUrl) {
        setRevealed(true);
      } else {
        addToast?.({
          type: "success",
          title: "Sample chapter on the way",
          message: "Check your inbox in the next few minutes.",
        });
        setEmail("");
      }
      if (typeof window !== "undefined") {
        try {
          window.dispatchEvent(
            new CustomEvent("sample_chapter_request", {
              detail: { bookSlug, email, isPastor },
            })
          );
        } catch {
          /* noop */
        }
      }
    },
    onError: err => {
      addToast?.({
        type: "error",
        title: "Request failed",
        message: err.message || "Please try again later.",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    subscribe.mutate({ email });
  };

  if (revealed && sampleUrl) {
    return (
      <div
        style={{
          background: "var(--bone-warm)",
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
          Your sample is ready.
        </h3>
        <p
          style={{
            fontFamily: "var(--B)",
            fontSize: "14px",
            lineHeight: 1.65,
            color: "var(--ink-muted)",
            marginBottom: "16px",
          }}
        >
          We'll also email it to you. Welcome to the list.
        </p>
        <a
          href={sampleUrl}
          download
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "var(--ink)",
            color: "var(--bone)",
            padding: "12px 22px",
            fontFamily: "var(--U)",
            fontSize: "13px",
            fontWeight: 600,
            borderRadius: "var(--radius-sm)",
            textDecoration: "none",
          }}
        >
          <Download size={14} aria-hidden />
          Download the sample chapter
        </a>
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
          fontSize: "22px",
          fontWeight: 500,
          color: "var(--ink)",
          marginBottom: "8px",
          letterSpacing: "-0.01em",
        }}
      >
        Read the first chapter free
      </h3>
      <p
        style={{
          fontFamily: "var(--B)",
          fontSize: "14px",
          lineHeight: 1.65,
          color: "var(--ink-muted)",
          marginBottom: "16px",
          maxWidth: "55ch",
        }}
      >
        First ~20 pages of <em>{bookTitle}</em>, delivered as a PDF. No spam
        — you get the chapter, you decide if you want more.
      </p>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "12px" }}
      >
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
              background: "var(--bone)",
              border: "1px solid var(--border)",
              borderRadius: "var(--radius-sm)",
              fontFamily: "var(--B)",
              fontSize: "14px",
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
            {subscribe.isPending ? "Sending…" : "Send me the chapter"}
          </button>
        </div>
        <label
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontFamily: "var(--B)",
            fontSize: "13px",
            color: "var(--ink-muted)",
            cursor: "pointer",
          }}
        >
          <input
            type="checkbox"
            checked={isPastor}
            onChange={e => setIsPastor(e.target.checked)}
          />
          I'm a pastor — send me the pastor's edition with a discussion guide.
        </label>
      </form>
    </div>
  );
}

export default SampleChapterForm;
