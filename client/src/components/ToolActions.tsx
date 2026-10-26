import { useState } from "react";
import { Printer, Share2, RotateCcw } from "lucide-react";
import { copyToClipboard } from "@/lib/clipboard";

interface ToolActionsProps {
  toolName: string;
  shareText?: string;
  /**
   * Hosts with saved progress pass their real restart handler here so
   * "Start Over" clears the stored answers. Without it a plain reload would
   * rehydrate the reader's saved state and start nothing over.
   */
  onStartOver?: () => void;
}

export function ToolActions({ toolName, shareText, onStartOver }: ToolActionsProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied" | "failed">("idle");

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const text = shareText || `${toolName} — ${window.location.href}`;
    const ok = await copyToClipboard(text);
    setCopyState(ok ? "copied" : "failed");
    setTimeout(() => setCopyState("idle"), 2000);
  };

  const handleStartOver = () => {
    if (onStartOver) {
      onStartOver();
      return;
    }
    window.location.reload();
  };

  const buttonStyle: React.CSSProperties = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    padding: "8px 14px",
    background: "none",
    border: "none",
    borderRadius: "2px",
    fontSize: "13px",
    fontFamily: "var(--U)",
    fontWeight: 500,
    color: "var(--ink-muted)",
    cursor: "pointer",
    transition: "color 0.2s",
  };

  return (
    <div
      className="no-print"
      style={{
        display: "flex",
        alignItems: "center",
        gap: "4px",
        background: "var(--bone-warm)",
        padding: "8px 12px",
        borderRadius: "2px",
        marginBottom: "24px",
        flexWrap: "wrap",
      }}
    >
      <button
        onClick={handlePrint}
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "var(--mustard)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "var(--ink-muted)";
        }}
      >
        <Printer size={15} />
        Print
      </button>
      <button
        onClick={handleShare}
        aria-live="polite"
        style={buttonStyle}
        onMouseEnter={(e) => {
          if (copyState === "idle") e.currentTarget.style.color = "var(--mustard)";
        }}
        onMouseLeave={(e) => {
          if (copyState === "idle") e.currentTarget.style.color = "var(--ink-muted)";
        }}
      >
        <Share2 size={15} />
        {copyState === "copied" ? "Copied" : copyState === "failed" ? "Couldn't copy" : "Share"}
      </button>
      <button
        onClick={handleStartOver}
        style={buttonStyle}
        onMouseEnter={(e) => {
          e.currentTarget.style.color = "var(--mustard)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.color = "var(--ink-muted)";
        }}
      >
        <RotateCcw size={15} />
        Start Over
      </button>
    </div>
  );
}
