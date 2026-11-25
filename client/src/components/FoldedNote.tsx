/**
 * FoldedNote: the one quiet line at the top of a tool that was folded into
 * another that does the same job (lib/toolsList.ts, `replacedBy`). The folded
 * tool keeps working at its own address; this line names the tool now listed
 * in its place, with a link. Renders nothing for a tool that is not folded.
 */
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { survivorOf, toolById } from "@/lib/toolsList";

export default function FoldedNote({ id }: { id: string }) {
  const tool = toolById(id);
  if (!tool.replacedBy) return null;
  const survivor = survivorOf(tool);
  return (
    <p className="lw-folded">
      <span>This tool still works, but the site now lists one tool for this job:</span>{" "}
      <Link href={survivor.href}>
        {survivor.name}
        <ArrowRight aria-hidden="true" size={15} strokeWidth={1.75} />
      </Link>
    </p>
  );
}
