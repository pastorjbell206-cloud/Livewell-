/**
 * Quote Library (/tools/quotes) — pull quotes mined verbatim from the LiveWell
 * corpus: essays, the book manuscripts, and the study guides. Each card carries
 * the quote, a link to the work it came from, copy/share controls, and a
 * bookmark that keeps it in a saved list on this device. Includes full-text
 * search, theme and pillar filters, a saved-quotes view with copy-all, and a
 * deterministic quote for today (no Math.random — the date picks it).
 */
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { useState, useMemo, useCallback } from "react";
import { Link } from "wouter";
import {
  Copy,
  Check,
  Share2,
  Filter,
  ChevronDown,
  Search,
  Bookmark,
  BookmarkCheck,
} from "lucide-react";
import { SOCIAL_QUOTES, type SocialQuote } from "@/data/social-quotes";
import { copyToClipboard } from "@/lib/clipboard";
import { readStoredJSON, writeStoredJSON, isArrayOf } from "@/lib/storage";

const PAGE_SIZE = 20;

/** Versioned storage key for the saved-quotes list (array of quote texts). */
const SAVED_KEY = "livewell-quotes-saved-v1";
const isString = (x: unknown): x is string => typeof x === "string";
const readSaved = (): string[] => readStoredJSON(SAVED_KEY, isArrayOf(isString), []);

const CATEGORIES = [
  { id: "all", label: "All" },
  { id: "conviction", label: "Conviction" },
  { id: "comfort", label: "Comfort" },
  { id: "challenge", label: "Challenge" },
  { id: "history", label: "History" },
  { id: "wisdom", label: "Wisdom" },
] as const;

const CATEGORY_COLORS: Record<string, string> = {
  conviction: "var(--c-mustard, #D4A017)",
  comfort: "#6B8E6B",
  challenge: "#B85C3A",
  history: "#5A7B9A",
  wisdom: "var(--c-ink-muted, #5A5448)",
};

/** Pillars offered in the filter — derived from the data, never hardcoded. */
const PILLAR_OPTIONS = [
  "All",
  ...Array.from(new Set(SOCIAL_QUOTES.map((q) => q.pillar))).sort(),
];

const SOURCE_COUNT = new Set(
  SOCIAL_QUOTES.map((q) => `${q.sourceType ?? "essay"}:${q.articleSlug}`)
).size;

function authorOf(q: SocialQuote): string {
  return q.author ?? "James Bell";
}

/** Route to the source work: essays under /writing, books under /read,
 *  study guides under /studyguides. */
function sourcePath(q: SocialQuote): string {
  switch (q.sourceType) {
    case "book":
      return `/read/${q.articleSlug}`;
    case "studyguide":
      return `/studyguides/${q.articleSlug}`;
    default:
      return `/writing/${q.articleSlug}`;
  }
}

function sourceKindLabel(q: SocialQuote): string {
  switch (q.sourceType) {
    case "book":
      return "From the book";
    case "studyguide":
      return "From the study guide";
    default:
      return "From the essay";
  }
}

function shareTextFor(q: SocialQuote): string {
  const url = `https://livewellbyjamesbell.co${sourcePath(q)}`;
  return `"${q.text}"\n\n— ${authorOf(q)}, "${q.articleTitle}"\n${url}`;
}

/** Deterministic index for "a quote for today": hash the local date string.
 *  Same day, same quote, for everyone — no randomness. */
function quoteOfTheDay(): SocialQuote {
  const d = new Date();
  const key = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  let h = 0;
  for (let i = 0; i < key.length; i++) h = (h * 31 + key.charCodeAt(i)) | 0;
  return SOCIAL_QUOTES[Math.abs(h) % SOCIAL_QUOTES.length];
}

const wrap = { maxWidth: "var(--w-default, 1200px)", margin: "0 auto" } as const;

const actionButtonStyle = (active: boolean) =>
  ({
    display: "inline-flex",
    alignItems: "center",
    gap: "0.35rem",
    fontFamily: "'Inter', sans-serif",
    fontSize: "0.8rem",
    fontWeight: 500,
    color: active ? "#6B8E6B" : "var(--c-ink-muted, #5A5448)",
    background: "none",
    border: "1px solid",
    borderColor: active ? "#6B8E6B" : "var(--c-ink-muted, #5A5448)",
    borderRadius: "4px",
    padding: "0.35rem 0.75rem",
    cursor: "pointer",
    transition: "all 0.2s",
  }) as const;

function QuoteCard({
  quote,
  index,
  saved,
  onToggleSave,
}: {
  quote: SocialQuote;
  index: number;
  saved: boolean;
  onToggleSave: (text: string) => void;
}) {
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  const shareText = shareTextFor(quote);
  const articleUrl = `https://livewellbyjamesbell.co${sourcePath(quote)}`;

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
        <span
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.75rem",
            color: "var(--c-ink-muted, #5A5448)",
          }}
        >
          {quote.pillar}
        </span>
        {quote.author && quote.author !== "James Bell" && (
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.75rem",
              color: "var(--c-ink-muted, #5A5448)",
            }}
          >
            · {quote.author}
          </span>
        )}
      </div>

      {/* Source link */}
      <p
        style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: "0.85rem",
          color: "var(--c-ink-muted, #5A5448)",
          margin: 0,
          lineHeight: 1.5,
        }}
      >
        {sourceKindLabel(quote)}{" "}
        <Link
          href={sourcePath(quote)}
          style={{
            color: "var(--c-ink, #14110C)",
            textDecoration: "none",
            borderBottom: "1px solid var(--c-mustard, #D4A017)",
            paddingBottom: "1px",
          }}
        >
          {quote.articleTitle}
        </Link>
      </p>

      {/* Actions */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "0.25rem" }}>
        <button
          onClick={handleCopy}
          style={actionButtonStyle(copied)}
          aria-label={`Copy quote from ${quote.articleTitle}`}
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? "Copied" : "Copy"}
        </button>
        <button
          onClick={handleShare}
          style={actionButtonStyle(shared)}
          aria-label={`Share quote from ${quote.articleTitle}`}
        >
          {shared ? <Check size={14} /> : <Share2 size={14} />}
          {shared ? "Shared" : "Share"}
        </button>
        <button
          onClick={() => onToggleSave(quote.text)}
          style={actionButtonStyle(saved)}
          aria-pressed={saved}
          aria-label={saved ? "Remove this quote from your saved list" : "Save this quote"}
        >
          {saved ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
          {saved ? "Saved" : "Save"}
        </button>
      </div>
      {copyFailed && (
        <p
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "0.8rem",
            color: "var(--c-ink-muted, #5A5448)",
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
  const [query, setQuery] = useState("");
  const [view, setView] = useState<"all" | "saved">("all");
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [saved, setSaved] = useState<string[]>(() => readSaved());
  const [saveFailed, setSaveFailed] = useState(false);
  const [allCopied, setAllCopied] = useState(false);
  const [allCopyFailed, setAllCopyFailed] = useState(false);

  const savedSet = useMemo(() => new Set(saved), [saved]);
  const today = useMemo(() => quoteOfTheDay(), []);

  const toggleSave = useCallback((text: string) => {
    setSaved((prev) => {
      const next = prev.includes(text) ? prev.filter((t) => t !== text) : [...prev, text];
      if (!writeStoredJSON(SAVED_KEY, next)) setSaveFailed(true);
      return next;
    });
  }, []);

  const resetPage = () => setVisible(PAGE_SIZE);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const base =
      view === "saved" ? SOCIAL_QUOTES.filter((x) => savedSet.has(x.text)) : SOCIAL_QUOTES;
    return base.filter((x) => {
      if (category !== "all" && x.category !== category) return false;
      if (pillar !== "All" && x.pillar !== pillar) return false;
      if (
        q &&
        !x.text.toLowerCase().includes(q) &&
        !x.articleTitle.toLowerCase().includes(q) &&
        !authorOf(x).toLowerCase().includes(q)
      )
        return false;
      return true;
    });
  }, [category, pillar, query, view, savedSet]);

  const shown = filtered.slice(0, visible);
  const hasMore = visible < filtered.length;
  const filtersActive = category !== "all" || pillar !== "All" || query.trim() !== "";

  const savedQuotes = useMemo(
    () => SOCIAL_QUOTES.filter((x) => savedSet.has(x.text)),
    [savedSet]
  );

  const handleCopyAll = useCallback(async () => {
    const block = savedQuotes.map(shareTextFor).join("\n\n");
    const ok = await copyToClipboard(block);
    if (!ok) {
      setAllCopyFailed(true);
      return;
    }
    setAllCopyFailed(false);
    setAllCopied(true);
    setTimeout(() => setAllCopied(false), 2000);
  }, [savedQuotes]);

  const clearFilters = () => {
    setCategory("all");
    setPillar("All");
    setQuery("");
    resetPage();
  };

  return (
    <Layout>
      <SEOMeta
        title="Words Worth Sharing | LiveWell by James Bell"
        description="Pull quotes mined verbatim from James Bell's essays, books, and study guides — searchable, saveable, and linked back to the work each line came from."
        url="/tools/quotes"
      />

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
              maxWidth: "52ch",
              margin: "0 auto",
            }}
          >
            The lines that stop you mid-scroll, taken word for word from the
            essays, books, and study guides — each one linked to the longer
            argument it came from.
          </p>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.85rem",
              color: "var(--c-ink-muted, #9A948A)",
              marginTop: "1.5rem",
            }}
          >
            {SOCIAL_QUOTES.length} quotes from {SOURCE_COUNT} works
          </p>
        </div>
      </section>

      {/* A quote for today */}
      <section
        style={{
          background: "var(--c-cream-warm, #EDE8DC)",
          padding: "3rem 1.5rem",
          textAlign: "center",
        }}
      >
        <div style={{ ...wrap, maxWidth: "760px" }}>
          <span
            style={{
              fontFamily: "'Inter', sans-serif",
              fontWeight: 500,
              fontSize: "0.75rem",
              textTransform: "uppercase",
              letterSpacing: "0.18em",
              color: "var(--c-mustard, #D4A017)",
              display: "block",
              marginBottom: "1.25rem",
            }}
          >
            A Quote for Today
          </span>
          <blockquote
            style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize: "clamp(1.35rem, 3vw, 1.75rem)",
              lineHeight: 1.5,
              fontStyle: "italic",
              color: "var(--c-ink, #14110C)",
              margin: "0 0 1.25rem",
            }}
          >
            &ldquo;{today.text}&rdquo;
          </blockquote>
          <p
            style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: "0.9rem",
              color: "var(--c-ink-muted, #5A5448)",
              margin: 0,
            }}
          >
            — {authorOf(today)},{" "}
            <Link
              href={sourcePath(today)}
              style={{
                color: "var(--c-ink, #14110C)",
                textDecoration: "none",
                borderBottom: "1px solid var(--c-mustard, #D4A017)",
                paddingBottom: "1px",
              }}
            >
              {today.articleTitle}
            </Link>
          </p>
        </div>
      </section>

      {/* Filters */}
      <section
        style={{
          background: "var(--c-cream, #F5F0E6)",
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
            gap: "0.75rem",
          }}
        >
          {/* View toggle */}
          <div
            role="group"
            aria-label="Choose between all quotes and your saved quotes"
            style={{ display: "flex", gap: "0.4rem" }}
          >
            {(
              [
                { id: "all", label: "All quotes" },
                { id: "saved", label: `Saved (${saved.length})` },
              ] as const
            ).map((v) => (
              <button
                key={v.id}
                onClick={() => {
                  setView(v.id);
                  resetPage();
                }}
                aria-pressed={view === v.id}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  padding: "0.35rem 0.85rem",
                  borderRadius: "4px",
                  border: "1px solid",
                  borderColor:
                    view === v.id ? "var(--c-black, #1A1A1A)" : "rgba(0,0,0,0.12)",
                  background: view === v.id ? "var(--c-black, #1A1A1A)" : "transparent",
                  color:
                    view === v.id ? "var(--c-cream, #F5F0E6)" : "var(--c-ink, #14110C)",
                  cursor: "pointer",
                  transition: "all 0.15s",
                }}
              >
                {v.label}
              </button>
            ))}
          </div>

          {/* Search */}
          <div style={{ position: "relative", flex: "1 1 220px", minWidth: "180px" }}>
            <Search
              size={14}
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "0.65rem",
                top: "50%",
                transform: "translateY(-50%)",
                color: "var(--c-ink-muted, #5A5448)",
                pointerEvents: "none",
              }}
            />
            <input
              type="search"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                resetPage();
              }}
              placeholder="Search the quotes"
              aria-label="Search quotes by text or source title"
              style={{
                width: "100%",
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.85rem",
                padding: "0.45rem 0.75rem 0.45rem 2rem",
                border: "1px solid rgba(0,0,0,0.12)",
                borderRadius: "4px",
                background: "var(--c-white, #FFFFFF)",
                color: "var(--c-ink, #14110C)",
              }}
            />
          </div>

          <Filter
            size={16}
            aria-hidden="true"
            style={{ color: "var(--c-ink-muted, #5A5448)", flexShrink: 0 }}
          />

          {/* Category pills */}
          <div
            role="group"
            aria-label="Filter by theme"
            style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}
          >
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setCategory(c.id);
                  resetPage();
                }}
                aria-pressed={category === c.id}
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  padding: "0.35rem 0.85rem",
                  borderRadius: "100px",
                  border: "1px solid",
                  borderColor:
                    category === c.id ? "var(--c-mustard, #D4A017)" : "rgba(0,0,0,0.12)",
                  background:
                    category === c.id ? "var(--c-mustard, #D4A017)" : "transparent",
                  color:
                    category === c.id ? "var(--c-white, #FFFFFF)" : "var(--c-ink, #14110C)",
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
                resetPage();
              }}
              aria-label="Filter by pillar"
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
              {PILLAR_OPTIONS.map((p) => (
                <option key={p} value={p}>
                  {p === "All" ? "All Pillars" : p}
                </option>
              ))}
            </select>
            <ChevronDown
              size={14}
              aria-hidden="true"
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
          {saveFailed && (
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.85rem",
                color: "var(--c-ink-muted, #5A5448)",
                marginBottom: "1rem",
              }}
            >
              Couldn&rsquo;t save to this browser — your saved quotes here will
              not survive a reload.
            </p>
          )}

          {/* Count + saved-view actions */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "0.75rem",
              marginBottom: "1.5rem",
            }}
          >
            <p
              role="status"
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: "0.85rem",
                color: "var(--c-ink-muted, #5A5448)",
                margin: 0,
              }}
            >
              {filtered.length} quote{filtered.length !== 1 ? "s" : ""}
              {view === "saved" && " saved"}
              {category !== "all" && ` in ${category}`}
              {pillar !== "All" && ` · ${pillar}`}
              {query.trim() !== "" && ` · matching “${query.trim()}”`}
            </p>
            {view === "saved" && savedQuotes.length > 0 && (
              <button
                onClick={handleCopyAll}
                style={actionButtonStyle(allCopied)}
                aria-label="Copy all saved quotes with their sources"
              >
                {allCopied ? <Check size={14} /> : <Copy size={14} />}
                {allCopied ? "Copied" : "Copy all"}
              </button>
            )}
            {allCopyFailed && view === "saved" && (
              <span
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "0.8rem",
                  color: "var(--c-ink-muted, #5A5448)",
                }}
              >
                Copy failed — select and copy manually.
              </span>
            )}
          </div>

          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", padding: "4rem 0" }}>
              <p
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: "1rem",
                  color: "var(--c-ink-muted, #5A5448)",
                  margin: "0 0 1.25rem",
                }}
              >
                {view === "saved" && saved.length === 0
                  ? "Nothing saved yet. The Save button on any card keeps the quote here, on this device."
                  : "No quotes match. Clear the search or broaden the filters."}
              </p>
              {view === "saved" && saved.length === 0 ? (
                <button
                  onClick={() => {
                    setView("all");
                    resetPage();
                  }}
                  style={actionButtonStyle(false)}
                >
                  Browse all quotes
                </button>
              ) : (
                filtersActive && (
                  <button onClick={clearFilters} style={actionButtonStyle(false)}>
                    Clear filters
                  </button>
                )
              )}
            </div>
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
                    saved={savedSet.has(q.text)}
                    onToggleSave={toggleSave}
                  />
                ))}
              </div>

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
