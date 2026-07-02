/**
 * ArticleDetail — single article page.
 *
 * Architectural notes:
 * - Fetches the post by slug (was: full listPublished + .find())
 * - Related articles uses the relatedArticles router
 * - Emits Article schema + Open Graph via SEOMeta (React 19 head JSX)
 * - Body width is 680px (var(--w-prose)) per CLAUDE.md
 * - Bookmark + reading progress persist in localStorage
 */
import { useEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useLocation, useParams } from "wouter";
import { Streamdown } from "streamdown";
import { ArrowLeft, Bookmark, Share2, User } from "lucide-react";

import Layout from "@/components/Layout";
import PageEndNav from "@/components/PageEndNav";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import { SEOMeta, getArticleSchema, getBreadcrumbSchema } from "@/components/SEOMeta";
import { AuthorBio } from "@/components/AuthorBio";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { CitationCopy } from "@/components/CitationCopy";
import { AudienceShare } from "@/components/AudienceShare";
import { AudienceLabel } from "@/components/AudienceLabel";
import { TrackChip } from "@/components/TrackChip";
import { GeneratedHero } from "@/components/GeneratedHero";
import { trpc } from "@/lib/trpc";
import { pillarForPost } from "@/lib/taxonomy";
import { articleUrl, OG_DEFAULT_IMAGE, SITE_URL } from "@/lib/site";

/**
 * Per-slug byline overrides. Every essay not listed here is authored by
 * James Bell (the default). Susanna Bell's essays open the platform's
 * motherhood/womanhood lane.
 */
const ARTICLE_AUTHORS: Record<string, string> = {
  "the-work-nobody-watches": "Susanna Bell",
  "the-womanhood-they-preached-was-small": "Susanna Bell",
};

function ShareButton({ title, url }: { title: string; url: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      type="button"
      onClick={async () => {
        if (typeof navigator !== "undefined" && navigator.share) {
          try {
            await navigator.share({ title, url, text: title });
            return;
          } catch {
            // user cancelled — fall through to clipboard copy
          }
        }
        try {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 1500);
        } catch {
          // clipboard unavailable
        }
      }}
      aria-label="Share this article"
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        background: "transparent",
        border: "1px solid var(--border)",
        borderRadius: "var(--radius-sm)",
        padding: "10px 16px",
        fontFamily: "var(--U)",
        fontSize: "13px",
        fontWeight: 600,
        color: "var(--ink-muted)",
        cursor: "pointer",
        transition: "all 0.2s",
      }}
    >
      <Share2 size={14} aria-hidden />
      {copied ? "Link copied" : "Share"}
    </button>
  );
}

function BookmarkButton({ slug }: { slug: string }) {
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    try {
      const stored = JSON.parse(
        localStorage.getItem("livewell:bookmarks") || "[]"
      ) as string[];
      setBookmarked(stored.includes(slug));
    } catch {
      // localStorage may be unavailable (private mode, sandbox)
    }
  }, [slug]);

  const toggle = () => {
    setBookmarked(prev => {
      const next = !prev;
      try {
        const stored = JSON.parse(
          localStorage.getItem("livewell:bookmarks") || "[]"
        ) as string[];
        const updated = next
          ? Array.from(new Set([...stored, slug]))
          : stored.filter(s => s !== slug);
        localStorage.setItem("livewell:bookmarks", JSON.stringify(updated));
      } catch {
        // ignore
      }
      return next;
    });
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={bookmarked}
      aria-label={bookmarked ? "Remove bookmark" : "Bookmark this article"}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "8px",
        background: "transparent",
        border: `1px solid ${bookmarked ? "var(--mustard)" : "var(--border)"}`,
        borderRadius: "var(--radius-sm)",
        padding: "10px 16px",
        fontFamily: "var(--U)",
        fontSize: "13px",
        fontWeight: 600,
        color: bookmarked ? "var(--ink)" : "var(--ink-muted)",
        cursor: "pointer",
        transition: "all 0.2s",
      }}
    >
      <Bookmark
        size={14}
        aria-hidden
        fill={bookmarked ? "currentColor" : "none"}
      />
      {bookmarked ? "Saved" : "Save"}
    </button>
  );
}

/**
 * ShareableQuote — every blockquote in an essay renders as a pull-quote the
 * reader can lift and share. Reads its own rendered text (so it survives
 * whatever markup Streamdown puts inside), then hands it to the native share
 * sheet, falling back to a clipboard copy with attribution and the article URL.
 */
function ShareableQuote({
  children,
  shareTitle,
  shareUrl,
}: {
  children?: React.ReactNode;
  shareTitle: string;
  shareUrl: string;
}) {
  const textRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  const onShare = async () => {
    const quote = textRef.current?.textContent?.trim() ?? "";
    if (!quote) return;
    const attributed = `"${quote}" — James Bell`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share({ title: shareTitle, text: attributed, url: shareUrl });
        return;
      } catch {
        // user dismissed — fall through to clipboard
      }
    }
    try {
      await navigator.clipboard.writeText(`${attributed}\n${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // clipboard unavailable
    }
  };

  return (
    <blockquote className="quote-share">
      <div className="quote-share__text" ref={textRef}>
        {children}
      </div>
      <button
        type="button"
        className="quote-share__btn"
        onClick={onShare}
        aria-label="Share this quote"
      >
        <Share2 size={13} aria-hidden />
        {copied ? "Copied" : "Share this quote"}
      </button>
    </blockquote>
  );
}

/**
 * QuoteSelectionShare — Medium-style "share any quote." When the reader
 * highlights text inside the essay body, a small Share button floats above the
 * selection. Desktop only: phones already surface a native selection menu, and
 * a second floating control there would collide with it.
 */
function QuoteSelectionShare({
  title,
  url,
  bodyRef,
}: {
  title: string;
  url: string;
  bodyRef: React.RefObject<HTMLDivElement | null>;
}) {
  const [pop, setPop] = useState<{ text: string; top: number; left: number } | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const fine =
      typeof window !== "undefined" &&
      typeof window.matchMedia === "function" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    const update = () => {
      const sel = window.getSelection();
      if (!sel || sel.isCollapsed || sel.rangeCount === 0) { setPop(null); return; }
      const text = sel.toString().trim();
      const range = sel.getRangeAt(0);
      const within = bodyRef.current && bodyRef.current.contains(range.commonAncestorContainer);
      if (!within || text.length < 12) { setPop(null); return; }
      const rect = range.getBoundingClientRect();
      if (!rect || rect.width === 0) { setPop(null); return; }
      setCopied(false);
      setPop({ text, top: rect.top, left: rect.left + rect.width / 2 });
    };
    const hide = () => setPop(null);

    document.addEventListener("mouseup", update);
    document.addEventListener("keyup", update);
    document.addEventListener("scroll", hide, true);
    return () => {
      document.removeEventListener("mouseup", update);
      document.removeEventListener("keyup", update);
      document.removeEventListener("scroll", hide, true);
    };
  }, [bodyRef]);

  if (!pop) return null;

  const share = async () => {
    const attributed = `“${pop.text}” — James Bell`;
    if (typeof navigator !== "undefined" && navigator.share) {
      try { await navigator.share({ title, text: attributed, url }); setPop(null); return; } catch { /* fall through to copy */ }
    }
    try {
      await navigator.clipboard.writeText(`${attributed}\n${url}`);
      setCopied(true);
      setTimeout(() => setPop(null), 1200);
    } catch { /* ignore */ }
  };

  return createPortal(
    <div style={{ position: "fixed", top: Math.max(8, pop.top - 46), left: pop.left, transform: "translateX(-50%)", zIndex: 1100 }}>
      <button
        type="button"
        onMouseDown={(e) => e.preventDefault()}
        onClick={share}
        style={{ display: "inline-flex", alignItems: "center", gap: "7px", background: "var(--charcoal)", color: "var(--bone)", border: "none", borderRadius: "var(--radius-sm)", padding: "8px 14px", fontFamily: "var(--U)", fontSize: "12px", fontWeight: 600, letterSpacing: "0.04em", cursor: "pointer", boxShadow: "var(--shadow-modal)", whiteSpace: "nowrap" }}
      >
        <Share2 size={13} aria-hidden /> {copied ? "Copied" : "Share quote"}
      </button>
    </div>,
    document.body
  );
}

function slugifyHeading(text: string, index: number) {
  const base = text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 60);
  return base || `section-${index + 1}`;
}

/**
 * TableOfContents — a slim, collapsible "In this essay" card for long pieces.
 *
 * Reads the section headings Streamdown rendered into the body, assigns stable
 * anchor ids, and links to them. Renders nothing on short essays (fewer than
 * three section headings), so the reading experience is untouched where a
 * contents list would only be noise. No layout grid, no right rail: the
 * single-column measure stays exactly as it was.
 */
function TableOfContents({
  bodyRef,
  contentKey,
}: {
  bodyRef: React.RefObject<HTMLDivElement | null>;
  contentKey: string;
}) {
  const [items, setItems] = useState<{ id: string; text: string }[]>([]);

  useEffect(() => {
    const root = bodyRef.current;
    if (!root) return;
    const seen = new Set<string>();
    const headings = Array.from(root.querySelectorAll("h2")).map((node, i) => {
      const text = node.textContent?.trim() || `Section ${i + 1}`;
      let id = node.id || slugifyHeading(text, i);
      while (seen.has(id)) id = `${id}-${i}`;
      seen.add(id);
      node.id = id;
      node.style.scrollMarginTop = "96px";
      return { id, text };
    });
    setItems(headings);
  }, [bodyRef, contentKey]);

  if (items.length < 3) return null;

  const handleJump = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
    if (typeof history !== "undefined") {
      history.replaceState(null, "", `#${id}`);
    }
  };

  return (
    <nav
      aria-label="In this essay"
      style={{ maxWidth: "var(--w-prose)", margin: "0 auto var(--s-5)" }}
    >
      <details
        open
        style={{
          background: "var(--card)",
          border: "1px solid var(--border)",
          borderLeft: "2px solid var(--mustard)",
          borderRadius: "var(--radius-sm)",
          padding: "16px 20px",
        }}
      >
        <summary
          style={{
            fontFamily: "var(--U)",
            fontSize: "11px",
            fontWeight: 600,
            textTransform: "uppercase",
            letterSpacing: "0.18em",
            color: "var(--mustard-text)",
            cursor: "pointer",
          }}
        >
          In this essay
        </summary>
        <ol
          style={{
            listStyle: "none",
            margin: "16px 0 0",
            padding: 0,
            display: "flex",
            flexDirection: "column",
            gap: "10px",
          }}
        >
          {items.map(item => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={e => handleJump(e, item.id)}
                style={{
                  fontFamily: "var(--B)",
                  fontSize: "15px",
                  lineHeight: 1.4,
                  color: "var(--ink-muted)",
                  textDecoration: "none",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--ink)")}
                onMouseLeave={e =>
                  (e.currentTarget.style.color = "var(--ink-muted)")
                }
              >
                {item.text}
              </a>
            </li>
          ))}
        </ol>
      </details>
    </nav>
  );
}

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const bodyRef = useRef<HTMLDivElement>(null);
  const [, navigate] = useLocation();
  const postQuery = trpc.posts.getBySlug.useQuery(
    { slug: slug ?? "" },
    { enabled: Boolean(slug) }
  );
  const post = postQuery.data ?? null;
  // Related essays grouped by the NEW pillar taxonomy, resolved client-side
  // from the slim index so it tracks pillarForPost without a backend change.
  const indexQuery = trpc.posts.listForIndex.useQuery();
  const related = useMemo(() => {
    if (!post) return [];
    const myPillar = pillarForPost(post);
    if (!myPillar) return [];
    return (indexQuery.data ?? [])
      .filter(p => p.slug !== post.slug && pillarForPost(p)?.id === myPillar.id)
      .slice(0, 3);
  }, [indexQuery.data, post]);

  if (postQuery.isLoading) {
    return (
      <Layout>
        <div style={{ padding: "var(--s-6) var(--s-4)", textAlign: "center" }}>
          <div style={{ color: "var(--ink-muted)" }}>Loading article…</div>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div style={{ padding: "var(--s-6) var(--s-4)", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--F)",
              fontSize: "28px",
              fontWeight: 500,
              color: "var(--ink)",
              marginBottom: "20px",
            }}
          >
            Article not found
          </h2>
          <button
            type="button"
            onClick={() => navigate("/writing")}
            style={{
              padding: "12px 24px",
              background: "var(--ink)",
              color: "var(--bone)",
              border: "none",
              borderRadius: "var(--radius-sm)",
              cursor: "pointer",
              fontFamily: "var(--U)",
              fontWeight: 600,
              fontSize: "13px",
            }}
          >
            Back to Writing
          </button>
        </div>
      </Layout>
    );
  }

  const canonical = articleUrl(post.slug);
  const description = post.excerpt || post.title;
  const ogImage = post.coverImage || OG_DEFAULT_IMAGE;
  const publishedIso = String(post.publishedAt || post.createdAt || "");
  const author = ARTICLE_AUTHORS[post.slug] ?? "James Bell";

  return (
    <Layout>
      <ReadingProgressBar />
      <SEOMeta
        title={post.title}
        description={description}
        image={ogImage}
        url={canonical}
        type="article"
        author={author}
        publishedDate={publishedIso}
        modifiedDate={String(post.updatedAt || publishedIso)}
        structuredData={[
          getArticleSchema(
            post.title,
            description,
            publishedIso,
            String(post.updatedAt || publishedIso),
            ogImage,
            canonical,
            undefined,
            undefined,
            undefined,
            author
          ),
          getBreadcrumbSchema([
            { name: "Home", url: SITE_URL },
            { name: "Writing", url: `${SITE_URL}/writing` },
            { name: post.title, url: canonical },
          ]),
        ]}
      />
      <article>
        {/* BACK BUTTON */}
        <div
          style={{
            padding: "20px var(--s-4)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <button
            type="button"
            onClick={() => navigate("/writing")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "transparent",
              border: "none",
              color: "var(--ink-muted)",
              cursor: "pointer",
              fontFamily: "var(--U)",
              fontSize: "13px",
              fontWeight: 600,
              padding: 0,
              transition: "color 0.2s",
            }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--ink)")}
            onMouseLeave={e =>
              (e.currentTarget.style.color = "var(--ink-muted)")
            }
          >
            <ArrowLeft size={16} aria-hidden />
            Back to Writing
          </button>
        </div>

        {/* HEADER — centered editorial */}
        <section
          style={{
            padding: "var(--s-6) var(--s-4) var(--s-5)",
            background: "var(--bone)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div
            style={{
              maxWidth: "var(--w-prose)",
              margin: "0 auto",
              textAlign: "center",
            }}
          >
            {/* Kicker — pillar */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "24px",
              }}
            >
              <TrackChip pillarOrTrack={post.pillar} slug={post.slug} />
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: "var(--F)",
                fontSize: "clamp(36px, 5vw, 56px)",
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                marginBottom: post.excerpt ? "24px" : "28px",
              }}
            >
              {post.title}
            </h1>

            {/* Standfirst / dek */}
            {post.excerpt && (
              <p
                style={{
                  fontFamily: "var(--F)",
                  fontSize: "22px",
                  lineHeight: 1.5,
                  color: "var(--ink-muted)",
                  fontStyle: "italic",
                  maxWidth: "32em",
                  margin: "0 auto 28px",
                }}
              >
                {post.excerpt}
              </p>
            )}

            {/* Mustard rule */}
            <div
              aria-hidden
              style={{
                width: "64px",
                height: "2px",
                background: "var(--mustard)",
                margin: "0 auto 20px",
              }}
            />

            {/* Meta row — byline · audience/reading time · date */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "16px",
                flexWrap: "wrap",
                fontFamily: "var(--U)",
                fontSize: "13px",
                color: "var(--ink-muted)",
              }}
            >
              <span style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
                <User size={14} aria-hidden />
                {author}
              </span>
              <span aria-hidden style={{ opacity: 0.5 }}>·</span>
              <AudienceLabel
                audience={post.audience}
                readingTimeMinutes={post.readingTimeMinutes ?? 5}
              />
              {post.publishedAt && (
                <>
                  <span aria-hidden style={{ opacity: 0.5 }}>·</span>
                  <time dateTime={publishedIso}>
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </time>
                </>
              )}
            </div>
          </div>
        </section>

        {/* HERO IMAGE — real cover when present, on-brand generated art otherwise */}
        <section style={{ padding: "var(--s-5) var(--s-4) 0" }}>
          <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
            {post.coverImage ? (
              <img
                src={post.coverImage}
                alt={post.title}
                width={1200}
                height={630}
                loading="eager"
                fetchPriority="high"
                style={{
                  width: "100%",
                  height: "auto",
                  aspectRatio: "16 / 9",
                  objectFit: "cover",
                  borderRadius: "var(--radius-sm)",
                  display: "block",
                }}
              />
            ) : (
              <GeneratedHero
                seed={post.slug}
                pillarId={pillarForPost(post)?.id}
                title={post.title}
              />
            )}
          </div>
        </section>

        {/* BODY */}
        <section style={{ padding: "var(--s-6) var(--s-4)" }}>
          <QuoteSelectionShare title={post.title} url={canonical} bodyRef={bodyRef} />
          <TableOfContents bodyRef={bodyRef} contentKey={post.slug} />
          <div
            className="article-body"
            ref={bodyRef}
            style={{
              maxWidth: "var(--w-prose)",
              margin: "0 auto",
              fontFamily: "var(--B)",
              fontSize: "18px",
              lineHeight: 1.75,
              color: "var(--ink)",
            }}
          >
            {post.body ? (
              <Streamdown
                components={{
                  blockquote: ({ children }: { children?: React.ReactNode }) => (
                    <ShareableQuote shareTitle={post.title} shareUrl={canonical}>
                      {children}
                    </ShareableQuote>
                  ),
                }}
              >
                {post.body.replace(/^\s*#{1,6}\s+.*\r?\n+/, "")}
              </Streamdown>
            ) : (
              <p style={{ fontStyle: "italic", color: "var(--ink-muted)" }}>
                This article is in preparation.
              </p>
            )}
          </div>

          {/* Reader actions */}
          <div
            style={{
              maxWidth: "var(--w-prose)",
              margin: "var(--s-5) auto 0",
              paddingTop: "var(--s-4)",
              borderTop: "1px solid var(--border)",
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "12px",
            }}
          >
            <BookmarkButton slug={post.slug} />
            <ShareButton title={post.title} url={canonical} />
            <CitationCopy
              title={post.title}
              url={canonical}
              publishedDate={publishedIso}
            />
            {/* Three-audience share replaces the single SendToPastor button */}
            <AudienceShare title={post.title} url={canonical} />
          </div>
        </section>

        {/* NEWSLETTER (single CTA — no fake form) */}
        <section
          style={{
            background: "var(--bone-warm)",
            padding: "var(--s-6) var(--s-4)",
          }}
        >
          <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
            <NewsletterSignup variant="inline" source="article" />
          </div>
        </section>

        {/* RELATED */}
        {related.length > 0 && (
          <section
            style={{
              background: "var(--card)",
              padding: "var(--s-6) var(--s-4)",
              borderTop: "1px solid var(--border)",
            }}
          >
            <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
              <h2
                style={{
                  fontFamily: "var(--F)",
                  fontSize: "28px",
                  fontWeight: 500,
                  color: "var(--ink)",
                  marginBottom: "32px",
                  letterSpacing: "-0.01em",
                }}
              >
                Related essays
              </h2>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "24px",
                }}
              >
                {related.map(item => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => navigate(`/writing/${item.slug}`)}
                    style={{
                      textAlign: "left",
                      padding: "20px",
                      background: "var(--bone)",
                      border: "1px solid var(--border)",
                      borderRadius: "var(--radius-sm)",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.borderColor = "var(--mustard)";
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.borderColor = "var(--border)";
                    }}
                  >
                    {pillarForPost(item) && (
                      <div
                        style={{
                          fontFamily: "var(--U)",
                          fontSize: "10px",
                          fontWeight: 600,
                          color: "var(--mustard-text)",
                          textTransform: "uppercase",
                          letterSpacing: "0.18em",
                          marginBottom: "10px",
                        }}
                      >
                        {pillarForPost(item)?.name}
                      </div>
                    )}
                    <h3
                      style={{
                        fontFamily: "var(--F)",
                        fontSize: "20px",
                        fontWeight: 500,
                        color: "var(--ink)",
                        marginBottom: "12px",
                        lineHeight: 1.25,
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {item.title}
                    </h3>
                    {item.readingTimeMinutes && (
                      <div
                        style={{
                          fontFamily: "var(--U)",
                          fontSize: "12px",
                          color: "var(--ink-muted)",
                        }}
                      >
                        {item.readingTimeMinutes} min read
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* AUTHOR BIO */}
        <AuthorBio author={author} />

        <PageEndNav back={{ href: "/writing", label: "All essays" }} />
      </article>
    </Layout>
  );
}
