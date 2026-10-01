/**
 * HelpForThisGuide — the way back from a study guide to Find Help.
 *
 * The needs registry (client/public/needs/index.json, built by
 * scripts/build-needs-index.mjs) records which study guides each need's kit
 * cites. On a guide's page this lists those needs, so a leader can hand the
 * right page to someone in the group who is carrying more than a session can
 * hold: a care page opens at /help/<slug>; a need without a page yet opens its
 * list on Find Help (/help?need=<slug>). Renders nothing until it has a link,
 * and nothing at all if the registry cannot be read.
 */
import { useEffect, useState } from "react";
import { Link } from "wouter";

interface NeedEntry {
  slug: string;
  title: string;
  page: boolean;
  guides?: string[];
}

export function HelpForThisGuide({ slug }: { slug: string }) {
  const [needs, setNeeds] = useState<NeedEntry[]>([]);

  useEffect(() => {
    let stale = false;
    fetch("/needs/index.json")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (stale || !Array.isArray(d?.needs)) return;
        setNeeds((d.needs as NeedEntry[]).filter((n) => n.guides?.includes(slug)));
      })
      .catch(() => {});
    return () => {
      stale = true;
    };
  }, [slug]);

  if (!needs.length) return null;
  return (
    <aside
      aria-labelledby="help-for-this-guide"
      style={{ maxWidth: "var(--w-prose)", margin: "var(--s-4) auto", padding: "0 var(--s-4)" }}
    >
      <div className="eyebrow" style={{ color: "var(--mustard-text)", marginBottom: "8px" }}>Find Help</div>
      <h2 id="help-for-this-guide" style={{ fontFamily: "var(--F)", fontSize: "clamp(22px, 3vw, 28px)", fontWeight: 400, color: "var(--ink)", margin: "0 0 10px" }}>
        When someone in the group is carrying this
      </h2>
      <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.65, color: "var(--ink-muted)", margin: "0 0 12px", maxWidth: "62ch" }}>
        Each of these pages meets one weight in plain words: what is going on, what Scripture says, what to do this week, and when to get more help. Hand one to anyone who needs more than a session can give.
      </p>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexWrap: "wrap", gap: "8px 20px" }}>
        {needs.map((n) => (
          <li key={n.slug}>
            <Link
              href={n.page ? `/help/${n.slug}` : `/help?need=${n.slug}`}
              style={{ fontFamily: "var(--U)", fontSize: "15px", fontWeight: 600, color: "var(--mustard-text)", textDecoration: "underline", textUnderlineOffset: "3px" }}
            >
              {n.title}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}

export default HelpForThisGuide;
