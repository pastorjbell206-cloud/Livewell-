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
import { useEffect, useState } from "react";
import { useLocation, useParams } from "wouter";
import { Streamdown } from "streamdown";
import { ArrowLeft, Bookmark, Clock, Share2, User } from "lucide-react";

import Layout from "@/components/Layout";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import { SEOMeta, getArticleSchema } from "@/components/SEOMeta";
import { AuthorBio } from "@/components/AuthorBio";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { CitationCopy } from "@/components/CitationCopy";
import { AudienceShare } from "@/components/AudienceShare";
import { AudienceLabel } from "@/components/AudienceLabel";
import { TrackChip } from "@/components/TrackChip";
import { trpc } from "@/lib/trpc";
import { articleUrl, OG_DEFAULT_IMAGE } from "@/lib/site";

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

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const postQuery = trpc.posts.getBySlug.useQuery(
    { slug: slug ?? "" },
    { enabled: Boolean(slug) }
  );
  const post = postQuery.data ?? null;
  const relatedQuery = trpc.relatedArticles.getRelated.useQuery(
    { slug: slug ?? "", pillar: post?.pillar ?? "" },
    { enabled: Boolean(post?.pillar) }
  );

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

  return (
    <Layout>
      <ReadingProgressBar />
      <SEOMeta
        title={post.title}
        description={description}
        image={ogImage}
        url={canonical}
        type="article"
        author="James Bell"
        publishedDate={publishedIso}
        modifiedDate={String(post.updatedAt || publishedIso)}
        structuredData={getArticleSchema(
          post.title,
          description,
          publishedIso,
          String(post.updatedAt || publishedIso),
          ogImage,
          canonical
        )}
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

        {/* HEADER */}
        <section
          style={{
            padding: "var(--s-6) var(--s-4) var(--s-5)",
            background: "var(--bone)",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
            {/* Eyebrow chip — links to the canonical track */}
            <div style={{ marginBottom: "20px" }}>
              <TrackChip pillarOrTrack={post.pillar} />
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
                marginBottom: "24px",
              }}
            >
              {post.title}
            </h1>

            {/* Meta info — byline + audience + date */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                paddingBottom: "20px",
                borderBottom: "1px solid var(--border)",
                flexWrap: "wrap",
                fontFamily: "var(--U)",
                fontSize: "13px",
                color: "var(--ink-muted)",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <User size={14} aria-hidden />
                James Bell
              </span>
              <AudienceLabel
                audience={post.audience}
                readingTimeMinutes={post.readingTimeMinutes ?? 5}
              />
              {post.publishedAt && (
                <time dateTime={publishedIso}>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>
              )}
            </div>

            {/* Standfirst / excerpt */}
            {post.excerpt && (
              <p
                style={{
                  fontFamily: "var(--F)",
                  fontSize: "21px",
                  lineHeight: 1.55,
                  color: "var(--ink-muted)",
                  fontStyle: "italic",
                  marginTop: "24px",
                  maxWidth: "60ch",
                }}
              >
                {post.excerpt}
              </p>
            )}
          </div>
        </section>

        {/* HERO IMAGE */}
        {post.coverImage && (
          <section style={{ padding: "var(--s-5) var(--s-4) 0" }}>
            <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
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
            </div>
          </section>
        )}

        {/* BODY */}
        <section style={{ padding: "var(--s-6) var(--s-4)" }}>
          <div
            className="article-body"
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
                                                        <Streamdown>{post.body.replace(/^\s*#{1,6}\s+.*\r?\n+/, "")}</Streamdown>
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
            <NewsletterSignup
              variant="inline"
              title="Get new essays in your inbox"
              description="Long-form theology delivered the way you'd want to read it: unhurried, weighted, no spam."
            />
          </div>
        </section>

        {/* RELATED */}
        {(relatedQuery.data?.length ?? 0) > 0 && (
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
                {relatedQuery.data?.slice(0, 3).map(related => (
                  <button
                    key={related.id}
                    type="button"
                    onClick={() => navigate(`/writing/${related.slug}`)}
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
                    {(related.topic || related.pillar) && (
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
                        {(related.topic ?? related.pillar)?.replace(/-/g, " ")}
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
                      {related.title}
                    </h3>
                    {related.readingTimeMinutes && (
                      <div
                        style={{
                          fontFamily: "var(--U)",
                          fontSize: "12px",
                          color: "var(--ink-muted)",
                        }}
                      >
                        {related.readingTimeMinutes} min read
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* AUTHOR BIO */}
        <AuthorBio />
      </article>
    </Layout>
  );
}
