/**
 * How-To Library (/how-tos). A static library of practical, Scripture-grounded
 * how-to guides published from scripts/articles/* via
 * scripts/build-howtos-index.mjs (client/public/howtos/index.json). Filterable
 * by topic via ?topic=<slug>. The guides read as one compact editorial index
 * under topic chips; each row links to /how-tos/<slug>.
 */
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import LoadFailed from "@/components/LoadFailed";
import { EditorialIndex } from "@/components/editorial/EditorialIndex";
import { fetchJson } from "@/lib/fetch-json";
import { useEffect, useMemo, useState } from "react";
import { Link } from "wouter";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

// readTime is usually "7 min read"; a few entries carry a bare minute count.
interface Entry { slug: string; title: string; excerpt: string; topic: string; readTime: string | number }
function isIndex(x: unknown): x is { articles: Entry[] } {
  return !!x && typeof x === "object" && Array.isArray((x as { articles?: unknown }).articles);
}
const readTimeLabel = (t: Entry["readTime"]) => {
  const s = String(t ?? "").trim();
  return /^\d+$/.test(s) ? `${s} min read` : s;
};

const TOPIC_LABEL: Record<string, string> = {
  "spiritual-formation": "The Inner Life",
  marriage: "Marriage",
  parenting: "Parenting",
  relationships: "Relationships",
  family: "The Home",
  work: "Work & Money",
  suffering: "Hard Seasons",
  "the-body": "The Body",
  "the-life-in-the-world": "Life in the World",
  discipleship: "Following Jesus",
  evangelism: "Sharing Your Faith",
};

const TOPIC_ORDER = [
  "spiritual-formation", "discipleship", "marriage", "parenting", "relationships",
  "family", "work", "the-body", "suffering", "the-life-in-the-world", "evangelism",
];

export default function HowTos() {
  // Loading, failed, and loaded are distinct states keyed to a retry nonce
  // (the LifeIndex pattern), so a failed fetch offers a retry instead of an
  // endless "Loading the library…".
  const [loaded, setLoaded] = useState<{ nonce: number; articles: Entry[] } | null>(null);
  const [failedAt, setFailedAt] = useState<number | null>(null);
  const [nonce, setNonce] = useState(0);
  const failed = failedAt === nonce;
  const items = loaded && loaded.nonce === nonce ? loaded.articles : null;
  const [active, setActive] = useState<string>(() => {
    const q = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("topic") : null;
    return q || "all";
  });

  useEffect(() => {
    let stale = false;
    fetchJson("/howtos/index.json", isIndex)
      .then((d) => { if (!stale) setLoaded({ nonce, articles: d.articles }); })
      .catch(() => { if (!stale) setFailedAt(nonce); });
    return () => { stale = true; };
  }, [nonce]);

  const topics = useMemo(() => {
    const present = Array.from(new Set((items ?? []).map((i) => i.topic)));
    return TOPIC_ORDER.filter((t) => present.includes(t)).concat(present.filter((t) => !TOPIC_ORDER.includes(t)));
  }, [items]);

  const shown = useMemo(
    () => (!items ? [] : active === "all" ? items : items.filter((i) => i.topic === active)),
    [items, active]
  );
  const countFor = (t: string) => (items ?? []).filter((i) => i.topic === t).length;

  return (
    <Layout>
      <SEOMeta
        title="How-To Guides — Practical, Scripture-Grounded Help for Real Life"
        description="Short, practical how-to guides for marriage, parenting, money, the inner life, hard seasons, and making disciples. Plain help, grounded in Scripture."
        url="https://www.livewellbyjamesbell.co/how-tos"
      />

      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--charcoal-fg)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>How-to guides</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5.2vw, 56px)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.025em", marginBottom: "18px", maxWidth: "18ch" }}>
            Practical help for real life
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "17.5px", lineHeight: 1.75, color: "rgba(245,240,230,0.82)", maxWidth: "62ch" }}>
            Short, plain guides for the things you actually have to do: start family worship, fight fair in marriage, get out of debt, share your faith without being weird, make a disciple at your table. Grounded in Scripture, written for the long obedience of an ordinary week.
          </p>
        </div>
      </section>

      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={wrap}>
          {failed ? (
            <LoadFailed what="The how-to library" onRetry={() => setNonce((n) => n + 1)} backHref="/" backLabel="Back home" />
          ) : items === null ? (
            <p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }} role="status">Loading the library…</p>
          ) : items.length === 0 ? (
            <p style={{ fontFamily: "var(--B)", color: "var(--ink-muted)" }}>No guides are published yet.</p>
          ) : (
            <>
              {/* topic filter */}
              <div className="ed-chips" role="group" aria-label="Filter guides by topic">
                {["all", ...topics].map((t) => (
                  <button key={t} type="button" className="ed-chip" aria-pressed={t === active} onClick={() => setActive(t)}>
                    {t === "all" ? "All" : (TOPIC_LABEL[t] || t)}
                    <span className="ed-chip-n">{t === "all" ? items.length : countFor(t)}</span>
                  </button>
                ))}
              </div>
              <p role="status" style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted)", margin: "0 0 var(--s-2)" }}>
                {`Showing ${shown.length} of ${items.length}`}
              </p>
              {shown.length === 0 ? (
                <p style={{ fontFamily: "var(--B)", fontSize: "16px", color: "var(--ink-muted)", padding: "var(--s-3) 0" }}>
                  No guides are filed under that topic. Choose one above.
                </p>
              ) : (
                <EditorialIndex
                  compact
                  headingAs="h2"
                  label="How-to guides"
                  items={shown.map((e) => ({
                    href: `/how-tos/${e.slug}`,
                    title: e.title,
                    dek: e.excerpt,
                    kicker: TOPIC_LABEL[e.topic] || e.topic,
                    meta: readTimeLabel(e.readTime),
                  }))}
                />
              )}
            </>
          )}

          <div style={{ marginTop: "var(--s-5)", borderTop: "1px solid var(--border)", paddingTop: "var(--s-3)", display: "flex", gap: "var(--s-4)", flexWrap: "wrap" }}>
            <Link href="/tools/wisdom-finder" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Wisdom Finder</Link>
            <Link href="/life" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>The Integrated Life</Link>
            <Link href="/disciple-making" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)" }}>Make Disciples</Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
