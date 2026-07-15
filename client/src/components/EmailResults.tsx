import { useState } from "react";
import { CheckCircle, Copy, Printer, BookmarkCheck } from "lucide-react";

export interface EmailResultsProps {
  toolName: string;
  resultsSummary: string;
}

/**
 * Keep-your-results block for assessment tools. Print and copy are the
 * primary actions because they work instantly and need no system behind
 * them. The email field records the reader's results with us (the contact
 * inbox the owner reads) — it does NOT send mail, because no sender exists
 * in this stack yet, and the copy must never claim otherwise. When real
 * transactional email ships (roadmap LT-4), delivery language can return.
 */
export function EmailResults({ toolName, resultsSummary }: EmailResultsProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(`${toolName} — results\n\n${resultsSummary}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: "",
          email,
          subject: `${toolName} Results`,
          message: resultsSummary,
        }),
      });
      if (res.ok) {
        setStatus("sent");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const actionButton = {
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    padding: "12px 20px",
    fontSize: "14px",
    fontFamily: "var(--U)",
    fontWeight: 600,
    background: "var(--charcoal)",
    color: "var(--bone)",
    border: "none",
    borderRadius: "2px",
    cursor: "pointer",
  } as const;

  return (
    <div
      className="no-print"
      style={{
        background: "var(--bone)",
        borderRadius: "2px",
        padding: "32px 36px",
        border: "1px solid var(--border)",
        marginTop: "32px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "12px" }}>
        <BookmarkCheck size={18} style={{ color: "var(--mustard-text)", flexShrink: 0 }} />
        <h3
          style={{
            fontFamily: "var(--F)",
            fontSize: "20px",
            fontWeight: 400,
            color: "var(--ink)",
            letterSpacing: "-0.01em",
            margin: 0,
          }}
        >
          Keep your results
        </h3>
      </div>

      <p
        style={{
          fontSize: "14px",
          lineHeight: 1.7,
          color: "var(--ink-muted)",
          fontFamily: "var(--U)",
          marginBottom: "16px",
        }}
      >
        These results live only on this screen. Print them or copy them somewhere
        you keep things.
      </p>

      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" }}>
        <button type="button" onClick={() => window.print()} style={actionButton}>
          <Printer size={15} aria-hidden /> Print
        </button>
        <button type="button" onClick={handleCopy} aria-live="polite" style={actionButton}>
          <Copy size={15} aria-hidden /> {copied ? "Copied" : "Copy results"}
        </button>
      </div>

      {status === "sent" ? (
        <div role="status" style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0 0" }}>
          <CheckCircle size={18} style={{ color: "var(--ok)", flexShrink: 0 }} />
          <p style={{ fontSize: "15px", fontFamily: "var(--U)", color: "var(--ok)", fontWeight: 500, margin: 0 }}>
            On file with us. Keep the printed or copied version for yourself.
          </p>
        </div>
      ) : (
        <>
          <p
            style={{
              fontSize: "13px",
              lineHeight: 1.7,
              color: "var(--ink-muted)",
              fontFamily: "var(--U)",
              marginBottom: "10px",
            }}
          >
            Want a copy kept on file with us as well? Leave your email. We don't
            send results by email yet; when that's built, you'll be first.
          </p>
          <form onSubmit={handleSubmit} style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <input
              type="email"
              required
              placeholder="you@example.com"
              aria-label="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: "1 1 220px",
                padding: "12px 16px",
                fontSize: "16px",
                fontFamily: "var(--U)",
                border: "1px solid var(--border)",
                borderRadius: "2px",
                background: "#FFFFFF",
                color: "var(--ink)",
                outline: "none",
              }}
            />
            <button
              type="submit"
              disabled={status === "sending"}
              style={{
                padding: "12px 24px",
                fontSize: "14px",
                fontFamily: "var(--U)",
                fontWeight: 600,
                background: "var(--mustard)",
                color: "var(--ink)",
                border: "none",
                borderRadius: "2px",
                cursor: status === "sending" ? "default" : "pointer",
                opacity: status === "sending" ? 0.7 : 1,
                whiteSpace: "nowrap",
              }}
            >
              {status === "sending" ? "Saving…" : "Keep on file"}
            </button>
          </form>
          {status === "error" && (
            <p role="alert" style={{ fontSize: "13px", fontFamily: "var(--U)", color: "var(--alert)", marginTop: "10px" }}>
              That didn't save. Print or copy your results above so you don't lose them.
            </p>
          )}
        </>
      )}
    </div>
  );
}
