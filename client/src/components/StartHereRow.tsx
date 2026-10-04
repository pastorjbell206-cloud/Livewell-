/**
 * StartHereRow — the hub spine from the wayfinding audit. A hub that opens on
 * a wall of cards makes a first-time reader do the curating; this row does it
 * for them: "start with these three," in order, each with one honest line.
 * It reads as a numbered path (the editorial index, one column, each line at
 * reading size), and an essay the reader has already finished is marked from
 * the device-local read memory (lib/readProgress). The full collection stays
 * below: depth intact, overwhelm gone.
 */
import { useState } from "react";
import { EditorialIndex } from "@/components/editorial/EditorialIndex";
import { getReadEssays } from "@/lib/readProgress";

export interface StartHereItem {
  title: string;
  blurb: string;
  href: string;
}

const ESSAY_PREFIX = "/writing/";

export function StartHereRow({
  eyebrow = "New here? Start with these",
  items,
}: {
  eyebrow?: string;
  items: StartHereItem[];
}) {
  const [readSlugs] = useState<Set<string>>(() => getReadEssays());
  return (
    <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4)", borderBottom: "1px solid var(--border)" }}>
      <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
        <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "16px" }}>{eyebrow}</div>
        {/* Titles stay spans, as before: this row has no section heading of
            its own, and an h3 here would skip a level under the page's h1. */}
        <EditorialIndex
          columns={1}
          numbered
          headingAs="span"
          label={eyebrow}
          items={items.map((it) => ({
            href: it.href,
            title: it.title,
            dek: it.blurb,
            // Only essays are tracked; a hub or tool link never shows a mark.
            read: it.href.startsWith(ESSAY_PREFIX) && readSlugs.has(it.href.slice(ESSAY_PREFIX.length)),
          }))}
        />
      </div>
    </section>
  );
}
