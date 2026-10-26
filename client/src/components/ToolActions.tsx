import { RotateCcw } from "lucide-react";
import { TakeItWithYou, takeButton } from "@/components/TakeItWithYou";

interface ToolActionsProps {
  toolName: string;
  /** One line that travels with the link when the reader sends the tool to their phone. */
  shareText?: string;
  /** What it is in My Library: "Tool" (the default) or "Self-check". */
  kind?: string;
  /**
   * Hosts with saved progress pass their real restart handler here so
   * "Start Over" clears the stored answers. Without it a plain reload would
   * rehydrate the reader's saved state and start nothing over.
   */
  onStartOver?: () => void;
}

/**
 * The bar at the top of a tool: send it to your phone, save it to My Library,
 * print it, or start over (components/TakeItWithYou does the sending and saving).
 */
export function ToolActions({ toolName, shareText, kind = "Tool", onStartOver }: ToolActionsProps) {
  const handleStartOver = () => {
    if (onStartOver) {
      onStartOver();
      return;
    }
    window.location.reload();
  };

  return (
    <div className="no-print" style={{ marginBottom: "8px" }}>
      <TakeItWithYou
        title={toolName}
        kind={kind}
        summary={shareText}
        print
        extra={
          <button type="button" onClick={handleStartOver} style={{ ...takeButton, background: "transparent", color: "var(--ink-muted)" }}>
            <RotateCcw size={16} aria-hidden /> Start Over
          </button>
        }
      />
    </div>
  );
}
