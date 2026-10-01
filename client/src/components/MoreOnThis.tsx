/**
 * MoreOnThis — the end-of-page "More on this" block for any item in the
 * Library: related essays, guides, wisdom topics, and how-tos, chosen from the
 * catalogue by shared Scripture, subject, and title words (lib/catalogue.ts
 * relatedItems). The catalogue loads only when the reader nears the end of the
 * page, so the block costs nothing on a page nobody finishes. Renders nothing
 * until it has something real to show.
 */
import { useEffect, useRef, useState } from "react";
import { fetchCatalogue, relatedItems, type CatalogueItem } from "@/lib/catalogue";
import { EditorialIndex } from "@/components/editorial/EditorialIndex";
import { SectionHead } from "@/components/editorial/SectionHead";

export default function MoreOnThis({ href, title }: { href: string; title?: string }) {
  const ref = useRef<HTMLElement | null>(null);
  const [near, setNear] = useState(false);
  const [items, setItems] = useState<CatalogueItem[]>([]);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!near) return;
    let stale = false;
    fetchCatalogue()
      .then((c) => { if (!stale) setItems(relatedItems(c.items, href, title)); })
      .catch(() => { /* the block is a courtesy; a failed load just leaves it out */ });
    return () => { stale = true; };
  }, [near, href, title]);

  return (
    <section ref={ref} aria-label={items.length ? "More on this" : undefined} style={{ background: "var(--bone-warm)", padding: items.length ? "var(--s-6) var(--s-4)" : 0 }}>
      {items.length > 0 && (
        <div style={{ maxWidth: "var(--w-default)", margin: "0 auto" }}>
          <SectionHead
            eyebrow="Keep going"
            title="More on this"
            seeAll={{ href: "/explore", label: "Everything in the Library" }}
          />
          <EditorialIndex
            compact
            label="Related reading"
            items={items.map((it) => ({ href: it.href, title: it.title, dek: it.summary, kicker: it.kind }))}
          />
        </div>
      )}
    </section>
  );
}
