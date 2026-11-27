/**
 * SeeAll: "See everything in ...", one closed row that opens the rest of a
 * page in place (the simpler pages, 2026-11-27). Nothing inside it leaves
 * the page: it is in the HTML for search engines and for find-in-page, and a
 * link to an address inside it (by its id) opens it (lib/openFold).
 */
import type { ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export default function SeeAll({ label, line, children, id }: { label: string; line?: string; children: ReactNode; id?: string }) {
  return (
    <details className="lw-all" id={id}>
      <summary>
        <span>
          {label}
          {line && <small>{line}</small>}
        </span>
        <ChevronDown aria-hidden="true" size={24} strokeWidth={1.75} />
      </summary>
      <div className="lw-all__body">{children}</div>
    </details>
  );
}
