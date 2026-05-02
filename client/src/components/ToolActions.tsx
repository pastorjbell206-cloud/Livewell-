import { useState } from "react";
import { Printer, Share2, RotateCcw } from "lucide-react";

interface ToolActionsProps {
  toolName: string;
  shareText?: string;
}

export function ToolActions({ toolName, shareText }: ToolActionsProps) {
  const [copied, setCopied] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const text = shareText || `${toolName} — ${window.location.href}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for older browsers
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleStartOver = () => {
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
        style={buttonStyle}
        onMouseEnter={(e) => {
          if (!copied) e.currentTarget.style.color = "var(--mustard)";
        }}
        onMouseLeave={(e) => {
          if (!copied) e.currentTarget.style.color = "var(--ink-muted)";
        }}
      >
        <Share2 size={15} />
        {copied ? "Copied!" : "Share"}
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
