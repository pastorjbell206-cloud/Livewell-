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
import { useEffect, useMemo, useState, lazy, Suspense } from "react";
import { useLocation, useParams } from "wouter";
import { ArrowLeft, Bookmark, Share2 } from "lucide-react";

// Lazy-load the heavy markdown renderer (pulls in shiki/mermaid/katex) so the
// article shell + SEO head paint before ~1MB of renderer code loads.
const Streamdown = lazy(() =>
  import("streamdown").then(m => ({ default: m.Streamdown }))
);

/**
 * Security hardening for the markdown renderer.
 *
 * In streamdown@1.4.0 the link/image prefix allowlists are NOT top-level
 * <Streamdown> props — they are options on the bundled `rehype-harden`
 * plugin, which streamdown ships pre-configured to allow EVERYTHING
 * (allowedLinkPrefixes: ["*"], allowedImagePrefixes: ["*"]). Passing the
 * prefixes as component props would be silently spread into react-markdown
 * and ignored, so `javascript:` links would still render.
 *
 * To actually block them we rebuild `rehypePlugins` from streamdown's
 * `defaultRehypePlugins`, overriding only the `harden` entry's config with
 * a real allowlist. Option names (`allowedLinkPrefixes`,
 * `allowedImagePrefixes`, `defaultOrigin`, `allowDataImages`) confirmed
 * against the streamdown dist bundle.
 */
const ALLOWED_LINK_PREFIXES = ["https://", "http://", "mailto:", "/", "#"];
const ALLOWED_IMAGE_PREFIXES = ["https://", "/", "data:"];

/**
 * Hand-written rehype visitor that stamps stable ids onto h2/h3 elements so the
 * Table of Contents anchors resolve. No new dependency: we recurse the hast
 * tree, collect text from child text nodes, and slugify with the SAME slugify
 * the ToC uses (imported from TableOfContents) so ids line up exactly. It runs
 * AFTER harden in the rehypePlugins chain, so it never weakens the allowlist.
 */
type HastNode = {
  type?: string;
  tagName?: string;
  value?: string;
  properties?: Record<string, unknown>;
  children?: HastNode[];
};

function collectText(node: HastNode): string {
  if (node.type === "text") return node.value ?? "";
  if (!node.children) return "";
  return node.children.map(collectText).join("");
}

function rehypeHeadingIds() {
  return (tree: HastNode) => {
    const visit = (node: HastNode) => {
      if (
        node.type === "element" &&
        (node.tagName === "h2" || node.tagName === "h3")
      ) {
        const id = slugify(collectText(node));
        if (id) {
          node.properties = node.properties ?? {};
          if (!node.properties.id) node.properties.id = id;
        }
      }
      node.children?.forEach(visit);
    };
    visit(tree);
  };
}

const hardenedRehypePluginsPromise = import("streamdown").then(m => {
  const plugins = { ...m.defaultRehypePlugins } as Record<string, unknown>;
  const harden = plugins.harden as [unknown, Record<string, unknown>] | undefined;
  if (Array.isArray(harden)) {
    plugins.harden = [
      harden[0],
      {
        ...harden[1],
        allowedLinkPrefixes: ALLOWED_LINK_PREFIXES,
        allowedImagePrefixes: ALLOWED_IMAGE_PREFIXES,
      },
    ];
  }
  // Heading-id injector runs last, after harden, purely additive.
  return [...Object.values(plugins), rehypeHeadingIds];
});

import Layout from "@/components/Layout";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import { SEOMeta, getArticleSchema, getBreadcrumbSchema } from "@/components/SEOMeta";
import { AuthorBio } from "@/components/AuthorBio";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { CitationCopy } from "@/components/CitationCopy";
import { AudienceShare } from "@/components/AudienceShare";
import { ArticleHero } from "@/components/ArticleHero";
import { ArticleNav } from "@/components/ArticleNav";
import { SeriesBanner } from "@/components/SeriesBanner";
import {
  TableOfContents,
  buildToc,
  slugify,
} from "@/components/TableOfContents";
import { trpc } from "@/lib/trpc";
import { articleUrl, ogImageUrl, SITE_URL } from "@/lib/site";

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
  // Hardened rehype plugins resolve alongside the lazy Streamdown chunk.
  // Until they load we hold off rendering the body (the page shell/SEO still
  // paints), guaranteeing the allowlist is in force before any markdown runs.
  const [rehypePlugins, setRehypePlugins] = useState<unknown[] | null>(null);
  useEffect(() => {
    let active = true;
    hardenedRehypePluginsPromise.then(plugins => {
      if (active) setRehypePlugins(plugins as unknown[]);
    });
    return () => {
      active = false;
    };
  }, []);
  const postQuery = trpc.posts.getBySlug.useQuery(
    { slug: slug ?? "" },
    { enabled: Boolean(slug) }
  );
  const post = postQuery.data ?? null;

  // Persist the last-read article so the homepage can offer "continue reading".
  // Runs only once a real post is loaded; never while loading or when null.
  useEffect(() => {
    if (!post) return;
    if (typeof window === "undefined") return;
    try {
      localStorage.setItem(
        "livewell:last-read",
        JSON.stringify({
          slug: post.slug,
          title: post.title,
          pillar: post.pillar ?? "",
          ts: Date.now(),
        })
      );
    } catch {
      // localStorage may be unavailable (private mode, sandbox) — ignore.
    }
  }, [post]);

  const relatedQuery = trpc.relatedArticles.getRelated.useQuery(
    { slug: slug ?? "", pillar: post?.pillar ?? "" },
    { enabled: Boolean(post?.pillar) }
  );
  // Shared/cached index list — powers prev/next "Keep reading" flow.
  const indexQuery = trpc.posts.listForIndex.useQuery();

  // Body with the leading duplicate H1 stripped (same transform used to render).
  const bodyForRender = useMemo(
    () => (post?.body ? post.body.replace(/^\s*#{1,6}\s+.*\r?\n+/, "") : ""),
    [post?.body]
  );

  // Table of contents from level-2 headings (rendered only when >= 3 exist).
  const tocItems = useMemo(() => buildToc(bodyForRender), [bodyForRender]);
  const hasToc = tocItems.length >= 3;

  // Prev (older) / next (newer) by publishedAt desc, fallback createdAt.
  const { prevPost, nextPost } = useMemo(() => {
    const list = indexQuery.data;
    if (!list || !post) return { prevPost: null, nextPost: null };
    const sorted = [...list].sort((a, b) => {
      const ta = new Date(String(a.publishedAt || a.createdAt || 0)).getTime();
      const tb = new Date(String(b.publishedAt || b.createdAt || 0)).getTime();
      return tb - ta;
    });
    const i = sorted.findIndex(p => p.slug === post.slug);
    if (i === -1) return { prevPost: null, nextPost: null };
    return {
      prevPost: sorted[i + 1] ?? null, // older
      nextPost: i > 0 ? sorted[i - 1] : null, // newer
    };
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
  // Prefer a real cover image; otherwise render a branded per-essay card via
  // the dynamic OG endpoint (api/og.tsx) instead of the single static default.
  const ogImage = post.coverImage || ogImageUrl(post.title, post.pillar ?? undefined);
  const publishedIso = String(post.publishedAt || post.createdAt || "");

  return (
    <Layout>
      <div className="no-print">
        <ReadingProgressBar />
      </div>
      <SEOMeta
        title={post.title}
        description={description}
        image={ogImage}
        url={canonical}
        type="article"
        author="James Bell"
        publishedDate={publishedIso}
        modifiedDate={String(post.updatedAt || publishedIso)}
        structuredData={[
          getArticleSchema(
            post.title,
            description,
            publishedIso,
            String(post.updatedAt || publishedIso),
            ogImage,
            canonical
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

        {/* HEADER — branded charcoal band (the "image" for each essay) */}
        <ArticleHero
          title={post.title}
          pillar={post.pillar}
          excerpt={post.excerpt}
          readingTimeMinutes={post.readingTimeMinutes ?? 5}
          publishedAt={post.publishedAt}
          publishedIso={publishedIso}
        />

        {/* SERIES BANNER — renders nothing unless this essay is in a series */}
        <div className="no-print">
          <SeriesBanner articleSlug={post.slug} />
        </div>

        {/* COVER IMAGE — framed figure below the band, never under text */}
        {post.coverImage && (
          <section style={{ padding: "var(--s-5) var(--s-4) 0" }}>
            <figure
              style={{
                maxWidth: "var(--w-content)",
                margin: "0 auto",
              }}
            >
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
                  border: "1px solid var(--border)",
                }}
              />
            </figure>
          </section>
        )}

        {/* BODY — sticky ToC rail + prose in a centered desktop grid */}
        <section style={{ padding: "var(--s-6) var(--s-4)" }}>
          <div
            className={hasToc ? "article-layout article-layout--toc" : "article-layout"}
          >
            {hasToc && <TableOfContents items={tocItems} />}

            <div>
              <div
                className="article-body"
                style={{
                  fontFamily: "var(--B)",
                  fontSize: "18px",
                  lineHeight: 1.75,
                  color: "var(--ink)",
                }}
              >
                {post.body ? (
                  <Suspense
                    fallback={
                      <p style={{ fontStyle: "italic", color: "var(--ink-muted)" }}>
                        Loading…
                      </p>
                    }
                  >
                    {rehypePlugins && (
                      <Streamdown
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        rehypePlugins={rehypePlugins as any}
                      >
                        {bodyForRender}
                      </Streamdown>
                    )}
                  </Suspense>
                ) : (
                  <p style={{ fontStyle: "italic", color: "var(--ink-muted)" }}>
                    This article is in preparation.
                  </p>
                )}
              </div>

              {/* Reader actions */}
              <div
                style={{
                  margin: "var(--s-5) 0 0",
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
                <div className="no-print">
                  <AudienceShare title={post.title} url={canonical} />
                </div>
              </div>

              {/* Keep reading — prev/next flow between essays */}
              <ArticleNav prev={prevPost} next={nextPost} />
            </div>
          </div>
        </section>

        {/* NEWSLETTER (single CTA — no fake form) */}
        <section
          className="no-print"
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
            className="no-print"
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
        <div className="no-print">
          <AuthorBio />
        </div>
      </article>
    </Layout>
  );
}
