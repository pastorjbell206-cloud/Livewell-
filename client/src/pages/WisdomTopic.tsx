/**
 * /wisdom/:id — a per-topic "what the Bible says about ___" page.
 *
 * The 208 wisdom topics (client/public/wisdom/topics.json, built by
 * scripts/build-wisdom-index.mjs) were only reachable through the Wisdom Finder
 * tool query before this — no indexable URL, not in the sitemap. This gives each
 * one its own page: the verified framing, the verses with references, the three
 * lenses (the world it was written in / how the church has understood it /
 * living it now), and links out to the related essays, books, and the tool.
 *
 * No new content is authored here — it renders the already-verified topic data
 * in a semantic, search-optimized layout with Article + breadcrumb JSON-LD. The
 * SEO win is turning existing verified content into 208 findable landing pages.
 */
import { useEffect, useState } from "react";
import { Link, useRoute } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import LoadFailed from "@/components/LoadFailed";
import { fetchJson } from "@/lib/fetch-json";

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

interface Verse { ref: string; text: string }
interface Related { label: string; href: string }
interface Topic {
  id: string;
  label: string;
  keywords: string[];
  framing: string;
  cultural: string;
  historical: string;
  application: string;
  verses: Verse[];
  related?: Related[];
  articles?: Related[];
}

const isTopicsFile = (x: unknown): x is { topics: Topic[] } => {
  const d = x as { topics?: unknown };
  return !!d && typeof d === "object" && Array.isArray(d.topics);
};

const lensEyebrow = {
  fontFamily: "var(--U)",
  fontSize: "12px",
  fontWeight: 600,
  letterSpacing: "0.08em",
  textTransform: "uppercase",
  color: "var(--mustard-text)",
  marginBottom: "10px",
} as const;

function Lens({ label, body }: { label: string; body: string }) {
  if (!body) return null;
  return (
    <section style={{ marginBottom: "var(--s-4)" }}>
      <h2 style={lensEyebrow as React.CSSProperties}>{label}</h2>
      <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.75, color: "var(--ink)", maxWidth: "68ch", margin: 0 }}>{body}</p>
    </section>
  );
}

export default function WisdomTopic() {
  const [, params] = useRoute("/wisdom/:id");
  const id = params?.id ?? "";
  const [topics, setTopics] = useState<Topic[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [nonce, setNonce] = useState(0);

  useEffect(() => {
    let stale = false;
    setFailed(false);
    fetchJson("/wisdom/topics.json", isTopicsFile)
      .then((d) => { if (!stale) setTopics(d.topics); })
      .catch(() => { if (!stale) setFailed(true); });
    return () => { stale = true; };
  }, [nonce]);

  if (failed) {
    return (
      <Layout>
        <LoadFailed onRetry={() => setNonce((n) => n + 1)} />
      </Layout>
    );
  }

  const topic = topics?.find((t) => t.id === id) ?? null;

  // Loaded, but no such topic — a real 404 for a bad id.
  if (topics && !topic) {
    return (
      <Layout>
        <SEOMeta title="Topic not found" description="This wisdom topic doesn't exist." />
        <section style={{ background: "var(--bone)", padding: "var(--s-7) var(--s-4)", textAlign: "center" }}>
          <div style={wrap}>
            <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(28px,4vw,40px)", fontWeight: 400, color: "var(--ink)", marginBottom: "16px" }}>No wisdom entry here</h1>
            <p style={{ fontFamily: "var(--B)", fontSize: "16px", color: "var(--ink-muted)", marginBottom: "24px" }}>That topic isn&rsquo;t one we cover. Browse the full library instead.</p>
            <Link href="/wisdom" style={{ fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--charcoal)", background: "var(--mustard)", padding: "12px 22px", textDecoration: "none", borderRadius: "2px" }}>Browse all wisdom</Link>
          </div>
        </section>
      </Layout>
    );
  }

  if (!topic) {
    // Still loading — keep it quiet; the render net and real users see a brief blank.
    return <Layout><div style={{ minHeight: "60vh" }} /></Layout>;
  }

  const title = `${topic.label} — What the Bible Says`;
  const description = topic.framing.length > 155 ? topic.framing.slice(0, 152).trimEnd() + "…" : topic.framing;
  const canonical = `https://www.livewellbyjamesbell.co/wisdom/${topic.id}`;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    about: topic.label,
    url: canonical,
    author: { "@type": "Person", name: "James Bell", url: "https://www.livewellbyjamesbell.co/about" },
    publisher: { "@type": "Organization", name: "LiveWell by James Bell" },
    isPartOf: { "@type": "CollectionPage", name: "Wisdom for All of Life", url: "https://www.livewellbyjamesbell.co/wisdom" },
  };
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Wisdom", item: "https://www.livewellbyjamesbell.co/wisdom" },
      { "@type": "ListItem", position: 2, name: topic.label, item: canonical },
    ],
  };

  return (
    <Layout>
      <SEOMeta
        title={title}
        description={description}
        keywords={topic.keywords.slice(0, 10).join(", ")}
        url={canonical}
        structuredData={[articleSchema, breadcrumbSchema]}
      />

      {/* Hero */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4) var(--s-5)", color: "var(--charcoal-fg)" }}>
        <div style={wrap}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "14px" }}>
            <Link href="/wisdom" style={{ color: "var(--mustard)", textDecoration: "none" }}>Wisdom</Link> · What the Bible says
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px, 5vw, 54px)", fontWeight: 400, lineHeight: 1.06, letterSpacing: "-0.025em", marginBottom: "18px", maxWidth: "20ch" }}>
            {topic.label}
          </h1>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.75, color: "rgba(245,240,230,0.85)", maxWidth: "64ch", margin: 0 }}>
            {topic.framing}
          </p>
        </div>
      </section>

      {/* Verses */}
      {topic.verses && topic.verses.length > 0 && (
        <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4)" }}>
          <div style={wrap}>
            <h2 style={lensEyebrow as React.CSSProperties}>What Scripture says</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              {topic.verses.map((v) => (
                <blockquote key={v.ref} style={{ margin: 0, borderLeft: "3px solid var(--mustard)", paddingLeft: "18px" }}>
                  <p style={{ fontFamily: "var(--F)", fontSize: "20px", fontStyle: "italic", lineHeight: 1.55, color: "var(--ink)", margin: "0 0 6px" }}>{v.text}</p>
                  <cite style={{ fontFamily: "var(--U)", fontStyle: "normal", fontWeight: 600, fontSize: "13px", letterSpacing: "0.04em", color: "var(--mustard-text)" }}>{v.ref}</cite>
                </blockquote>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* The three lenses */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) var(--s-4)" }}>
        <div style={wrap}>
          <Lens label="The world it was written in" body={topic.cultural} />
          <Lens label="How the church has understood it" body={topic.historical} />
          <Lens label="Living it now" body={topic.application} />
        </div>
      </section>

      {/* Keep reading — related essays, books, and the tool */}
      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={wrap}>
          <h2 style={lensEyebrow as React.CSSProperties}>Keep reading</h2>
          <ul style={{ listStyle: "none", margin: 0, padding: 0 }}>
            {[...(topic.related ?? []), ...(topic.articles ?? [])].map((r) => (
              <li key={r.href} style={{ padding: "12px 0", borderBottom: "1px solid var(--border)" }}>
                <Link href={r.href} style={{ fontFamily: "var(--F)", fontSize: "18px", color: "var(--ink)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "2px" }}>
                  {r.label}
                </Link>
              </li>
            ))}
            <li style={{ padding: "16px 0 0" }}>
              <Link href="/tools/wisdom-finder" style={{ fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, color: "var(--mustard-text)", textDecoration: "none" }}>
                Search all 200+ topics in the Wisdom Finder →
              </Link>
            </li>
          </ul>
        </div>
      </section>
    </Layout>
  );
}
