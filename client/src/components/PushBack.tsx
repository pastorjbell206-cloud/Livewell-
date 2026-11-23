/**
 * PushBack: one line at the end of an argued page (an Honest Answer, a piece
 * of the case for the faith) for the reader who thinks it is wrong. It sends
 * them to Write to James (/contact), where a message is saved for James to
 * read, and asks them to say where. It promises no reply.
 *
 * The walk of 2026-11-23 (docs/work/elite/walk-2026-11.md, finding 2): a
 * skeptic who wanted to argue back found no way to from the page he
 * disagreed with; Contact was three taps away through the menu.
 */
import { Link } from "wouter";
import { Mail } from "lucide-react";

export default function PushBack({ what }: { what: string }) {
  return (
    <div className="lw-newline" data-testid="push-back">
      <Mail aria-hidden="true" size={22} strokeWidth={1.75} />
      <span>
        Think this {what} gets something wrong? <Link href="/contact">Write to James</Link> and say where.
      </span>
    </div>
  );
}
