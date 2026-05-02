import { useState } from "react";
import { Mail, CheckCircle } from "lucide-react";

export interface EmailResultsProps {
  toolName: string;
  resultsSummary: string;
}

export function EmailResults({ toolName, resultsSummary }: EmailResultsProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

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
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          marginBottom: "12px",
        }}
      >
        <Mail size={18} style={{ color: "var(--mustard)", flexShrink: 0 }} />
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
          Save your results
        </h3>
      </div>

      {status === "sent" ? (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "16px 0 4px",
          }}
        >
          <CheckCircle size={18} style={{ color: "#2D6A4F", flexShrink: 0 }} />
          <p
            style={{
              fontSize: "15px",
              fontFamily: "var(--U)",
              color: "#2D6A4F",
              fontWeight: 500,
              margin: 0,
            }}
          >
            Results sent. Check your inbox.
          </p>
        </div>
      ) : (
        <>
          <p
            style={{
              fontSize: "14px",
              lineHeight: 1.7,
              color: "var(--ink-muted)",
              fontFamily: "var(--U)",
              marginBottom: "16px",
            }}
          >
            Enter your email and we will send you a copy of your results.
          </p>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
            }}
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: "1 1 220px",
                padding: "12px 16px",
                fontSize: "14px",
                fontFamily: "var(--U)",
                border: "1px solid var(--border)",
                borderRadius: "2px",
                background: "#FFFFFF",
                color: "var(--ink)",
                outline: "none",
                transition: "border-color 0.2s",
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = "var(--mustard)";
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = "var(--border)";
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
                transition: "opacity 0.2s",
                whiteSpace: "nowrap",
              }}
              onMouseEnter={(e) => {
                if (status !== "sending") {
                  e.currentTarget.style.opacity = "0.85";
                }
              }}
              onMouseLeave={(e) => {
                if (status !== "sending") {
                  e.currentTarget.style.opacity = "1";
                }
              }}
            >
              {status === "sending" ? "Sending..." : "Send to my email"}
            </button>
          </form>
          {status === "error" && (
            <p
              style={{
                fontSize: "13px",
                fontFamily: "var(--U)",
                color: "#C0392B",
                marginTop: "10px",
              }}
            >
              Something went wrong. Please try again.
            </p>
          )}
        </>
      )}
    </div>
  );
}
