/**
 * Quote Library (/tools/quotes) — browsable pull quotes from the LiveWell
 * article library, designed for social sharing. Each card carries the quote,
 * the source article, and copy/share controls.
 */
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { useState, useMemo, useCallback } from "react";
import { Link } from "wouter";
import { Copy, Check, Share2, Filter, ChevronDown } from "lucide-react";
import { SOCIAL_QUOTES, type SocialQuote } from "@/data/social-quotes";
import { copyToClipboard } from "@/lib/clipboard";

const PAGE_SIZE = 20;

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "conviction", label: "Conviction" },
  { id: "comfort", label: "Comfort" },
  { id: "challenge", label: "Challenge" },
  { id: "history", label: "History" },
  { id: "wisdom", label: "Wisdom" },
] as const;

const PILLARS = [
  "All",
  "Theological Depth",
  "Prophetic Disruption",
  "Prophetic Justice",
  "Leadership Formation",
  "Integrated Life",
] as const;

const CATEGORY_COLORS: Record<string, string> = {
  conviction: "var(--c-mustard, #D4A017)",
  comfort: "#6B8E6B",
  challenge: "#B85C3A",
  history: "#5A7B9A",
  wisdom: "var(--c-ink-muted, #5A5448)",
};

const wrap = { maxWidth: "var(--w-default, 1200px)", margin: "0 auto" } as const;

function QuoteCard({ quote, index }: { quote: SocialQuote; index: number }) {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  const articleUrl = `https://livewellbyjamesbell.co/writing/${quote.articleSlug}`;
  const shareText = `"${quote.text}"\n\n— James Bell, "${quote.articleTitle}"\n${articleUrl}`;

  const handleCopy = useCallback(async () => {
    const ok = await copyToClipboard(shareText);
    if (!ok) {
      setCopyFailed(true);
      return false;
    }
    setCopyFailed(false);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    return true;
  }, [shareText]);

  const handleShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({ text: shareText, url: articleUrl });
      } catch {
        /* user cancelled */
      }
    } else {
      const ok = await handleCopy();
      if (!ok) return;
      setShared(true);
      setTimeout(() => setShared(false), 2000);
    }
  }, [shareText, articleUrl, handleCopy]);

  return (
    <article
      style={{
        background: "var(--c-white, #FFFFFF)",
        borderLeft: `4px solid ${CATEGORY_COLORS[quote.category] || "var(--c-mustard, #D4A017)"}`,
        borderRadius: "4px",
        padding: "2rem 2rem 1.5rem",
        boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        opacity: 0,
        animation: `quoteIn 0.4s ease ${Math.min(index * 0.03, 0.6)}s forwards`,
      }}
    >
      {/* Quote text */}
      <blockquote
        style={{
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize: "1.25rem",
          lineHeight: 1.6,
          fontStyle: "italic",
          color: "var(--c-ink, #14110C)",
          margin: 0,
          padding: 0,
          flex: 1,
        }}
      >
        &ldquo;{quote.text}&rdquo;
      </blockquote>

      {/* Meta row */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignItems: "center",
          gap: "0.5rem",
          marginTop: "auto",
        }}
      >
        {/* Category badge */}
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.7rem",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.14em",
            color: CATEGORY_COLORS[quote.category] || "var(--c-ink-muted, #5A5448)",
            border: `1px solid ${CATEGORY_COLORS[quote.category] || "var(--c-ink-muted, #5A5448)"}`,
            borderRadius: "3px",
            padding: "0.15rem 0.5rem",
            lineHeight: 1,
          }}
        >
          {quote.category}
        </span>
        {/* Pillar */}
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.75rem",
            color: "var(--c-ink-muted, #5A5448)",
          }}
        >
          {quote.pillar}
        </span>
      </div>

      {/* Source article link */}
      <Link
        href={`/writing/${quote.articleSlug}`}
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.85rem",
          color: "var(--c-ink, #14110C)",
          textDecoration: "none",
          borderBottom: "1px solid var(--c-mustard, #D4A017)",
          paddingBottom: "1px",
          lineHeight: 1.4,
        }}
      >
        {quote.articleTitle}
      </Link>

      {/* Actions */}
      <div style={{ display: "flex", gap: "0.75rem", marginTop: "0.25rem" }}>
        <button
          onClick={handleCopy}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.8rem",
            fontWeight: 500,
            color: copied ? "#6B8E6B" : "var(--c-ink-muted, #5A5448)",
            background: "none",
            border: "1px solid",
            borderColor: copied ? "#6B8E6B" : "var(--c-ink-muted, #5A5448)",
            borderRadius: "4px",
            padding: "0.35rem 0.75rem",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          aria-label="Copy quote to clipboard"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy"}
        </button>
        <button
          onClick={handleShare}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.35rem",
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.8rem",
            fontWeight: 500,
            color: shared ? "#6B8E6B" : "var(--c-ink-muted, #5A5448)",
            background: "none",
            border: "1px solid",
            borderColor: shared ? "#6B8E6B" : "var(--c-ink-muted, #5A5448)",
            borderRadius: "4px",
            padding: "0.35rem 0.75rem",
            cursor: "pointer",
            transition: "all 0.2s",
          }}
          aria-label="Share quote"
        >
          {shared ? <Check size={14} /> : <Share2 size={14} />}
          {shared ? "Shared" : "Share"}
        </button>
      </div>
      {copyFailed && (
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.8rem",
            color: "var(--ink-muted)",
            margin: 0,
          }}
        >
          Copy failed — select and copy manually.
        </p>
      )}
    </article>
  );
}

export default function QuoteLibrary() {
  const [category, setCategory] = useState("all");
  const [pillar, setPillar] = useState("All");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const filtered = useMemo(() => {
    return SOCIAL_QUOTES.filter((q) => {
      if (category !== "all" && q.category !== category) return false;
      if (pillar !== "All" && q.pillar !== pillar) return false;
      return true;
    });
  }, [category, pillar]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;

  return (
    <Layout>
      <SEOMeta
        title="Words Worth Sharing | LiveWell by James Bell"
        description="Pull quotes from the LiveWell article library — shareable lines on theology, leadership, justice, and the life of faith."
        url="/tools/quotes"
      />

      {/* Keyframe animation for quote cards */}
      <style>{`
        @keyframes quoteIn {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Hero */}
      <section
        style={{
          background: "var(--c-black, #1A1A1A)",
          color: "var(--c-cream, #F5F0E6)",
          padding: "5rem 1.5rem 4rem",
          textAlign: "center",
        }}
      >
        <div style={wrap}>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "var(--c-mustard, #D4A017)",
              display: "block",
              marginBottom: "1rem",
            }}
          >
            LiveWell Library
          </span>
          <h1
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontWeight: 400,
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              letterSpacing: "-0.02em",
              lineHeight: 1.15,
              margin: "0 0 1.25rem",
              color: "var(--c-cream, #F5F0E6)",
            }}
          >
            Words Worth Sharing
          </h1>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              color: "var(--c-ink-muted, #9A948A)",
              maxWidth: "48ch",
              margin: "0 auto",
            }}
          >
            Pull quotes from the LiveWell library — the lines that stop you
            mid-scroll, formatted for sharing.
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              color: "var(--c-ink-muted, #5A5448)",
              marginTop: "1.5rem",
            }}
          >
            {SOCIAL_QUOTES.length} quotes from {new Set(SOCIAL_QUOTES.map((q) => q.articleSlug)).size} articles
          </p>
        </div>
      </section>

      {/* Filters */}
      <section
        style={{
          background: "var(--c-cream-warm, #EDE8DC)",
          borderBottom: "1px solid rgba(0,0,0,0.06)",
          padding: "1.25rem 1.5rem",
          position: "sticky",
          top: 0,
          zIndex: 10,
        }}
      >
        <div
          style={{
            ...wrap,
            display: "flex",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <Filter
            size={16}
            style={{ color: "var(--c-ink-muted, #5A5448)", flexShrink: 0 }}
          />

          {/* Category pills */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.4rem",
            }}
          >
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setCategory(c.id);
                  setVisible(PAGE_SIZE);
                }}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  padding: "0.35rem 0.85rem",
                  borderRadius: "100px",
                  border: "1px solid",
                  borderColor:
                    category === c.id
                      ? "var(--c-mustard, #D4A017)"
                      : "rgba(0,0,0,0.12)",
                  background:
                    category === c.id
                      ? "var(--c-mustard, #D4A017)"
                      : "transparent",
                  color:
                    category === c.id
                      ? "var(--c-white, #FFFFFF)"
                      : "var(--c-ink, #14110C)",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Pillar dropdown */}
          <div style={{ position: "relative", marginLeft: "auto" }}>
            <select
              value={pillar}
              onChange={(e) => {
                setPillar(e.target.value);
                setVisible(PAGE_SIZE);
              }}
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.8rem",
                fontWeight: 500,
                padding: "0.4rem 2rem 0.4rem 0.75rem",
                border: "1px solid rgba(0,0,0,0.12)",
                borderRadius: "4px",
                background: "var(--c-white, #FFFFFF)",
                color: "var(--c-ink, #14110C)",
                cursor: "pointer",
                appearance: "none",
                WebkitAppearance: "none",
              }}
            >
              {PILLARS.map((p) => (
                <option key={p} value={p}>
                  {p === "All" ? "All Pillars" : p}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              style={{
                position: "absolute",
                right: "0.5rem",
                top: "50%",
                transform: "translateY(-50%)",
                pointerEvents: "none",
                color: "var(--c-ink-muted, #5A5448)",
              }}
            />
          </div>
        </div>
      </section>

      {/* Quotes grid */}
      <section
        style={{
          background: "var(--c-cream, #F5F0E6)",
          padding: "3rem 1.5rem 4rem",
          minHeight: "60vh",
        }}
      >
        <div style={wrap}>
          {/* Count */}
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              color: "var(--c-ink-muted, #5A5448)",
              marginBottom: "1.5rem",
            }}
          >
            {filtered.length} quote{filtered.length !== 1 ? "s" : ""}
            {category !== "all" && ` in ${category}`}
            {pillar !== "All" && ` · ${pillar}`}
          </p>

          {filtered.length === 0 ? (
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "1rem",
                color: "var(--c-ink-muted, #5A5448)",
                textAlign: "center",
                padding: "4rem 0",
              }}
            >
              No quotes match those filters. Try broadening your selection.
            </p>
          ) : (
            <>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 400px), 1fr))",
                  gap: "1.5rem",
                }}
              >
                {shown.map((q, i) => (
                  <QuoteCard
                    key={`${q.articleSlug}-${q.text.slice(0, 30)}`}
                    quote={q}
                    index={i}
                  />
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
                  <button
                    onClick={() => setVisible((v) => v + PAGE_SIZE)}
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: "0.9rem",
                      fontWeight: 500,
                      padding: "0.75rem 2rem",
                      background: "var(--c-black, #1A1A1A)",
                      color: "var(--c-cream, #F5F0E6)",
                      border: "none",
                      borderRadius: "4px",
                      cursor: "pointer",
                      transition: "opacity 0.15s",
                    }}
                  >
                    Load more ({filtered.length - visible} remaining)
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      <section
        style={{
          background: "var(--c-black, #1A1A1A)",
          color: "var(--c-cream, #F5F0E6)",
          padding: "3rem 1.5rem",
          textAlign: "center",
        }}
      >
        <div style={wrap}>
          <p
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "1.5rem",
              fontWeight: 400,
              lineHeight: 1.4,
              maxWidth: "48ch",
              margin: "0 auto 1.5rem",
            }}
          >
            Every quote comes from a longer argument. Read the full essays.
          </p>
          <Link
            href="/writing"
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9rem",
              fontWeight: 500,
              padding: "0.75rem 2rem",
              background: "var(--c-mustard, #D4A017)",
              color: "var(--c-white, #FFFFFF)",
              borderRadius: "4px",
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            Browse the Library
          </Link>
        </div>
      </section>
    </Layout>
  );
}
