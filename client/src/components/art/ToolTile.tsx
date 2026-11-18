/**
 * ToolTile: one tool, as the tools page and the self-checks page show it.
 * The icon in the kit's ruled square, the tool's one name (lib/toolsList.ts),
 * the job in one sentence, and a quiet line with how long it takes and what
 * it keeps on this device. The whole tile is one link, well over 44px tall.
 * Lay several out in <ul className="lw-tools">.
 */
import { Clock, Smartphone } from "lucide-react";
import { Link } from "wouter";
import type { Tool } from "@/lib/toolsList";

export default function ToolTile({ tool }: { tool: Tool }) {
  const Icon = tool.icon;
  return (
    <Link href={tool.href} className="lw-tool">
      <span className="lw-tile__icon" aria-hidden="true">
        <Icon size={22} strokeWidth={1.75} />
      </span>
      <span className="lw-tool__text">
        <span className="lw-tool__name">{tool.name}</span>
        <span className="lw-tool__job">{tool.job}</span>
        <span className="lw-tool__meta">
          <span>
            <Clock aria-hidden="true" size={14} strokeWidth={1.75} />
            {tool.time}
          </span>
          <span>
            <Smartphone aria-hidden="true" size={14} strokeWidth={1.75} />
            {tool.keeps === "Nothing" ? "Keeps nothing" : `Keeps: ${tool.keeps.charAt(0).toLowerCase()}${tool.keeps.slice(1)}`}
          </span>
        </span>
      </span>
    </Link>
  );
}
