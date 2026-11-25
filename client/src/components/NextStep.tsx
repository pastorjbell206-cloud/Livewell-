/**
 * NextStep: one real next step on this site at the end of a tool
 * (TOOLS-PLAN unit 11, "It leads somewhere next"). It names the next tool by
 * its one name from lib/toolsList.ts, with one short line of why.
 */
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { toolById } from "@/lib/toolsList";

export default function NextStep({ id, line, dark = false }: { id: string; line: string; dark?: boolean }) {
  const tool = toolById(id);
  return (
    <p className={`lw-next${dark ? " lw-next--dark" : ""}`}>
      <span className="lw-next__label">Next step</span>
      <span className="lw-next__body">
        <Link href={tool.href} className="lw-next__link">
          {tool.name}
          <ArrowRight aria-hidden="true" size={16} strokeWidth={1.75} />
        </Link>
        <span className="lw-next__line">{line}</span>
      </span>
    </p>
  );
}
