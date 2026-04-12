import Layout from "@/components/Layout";
import { useParams, useLocation } from "wouter";
import { useMemo, useState } from "react";
import { Streamdown } from "streamdown";
import { trpc } from "@/lib/trpc";
import { ArrowLeft, Share2, Bookmark, Clock, User } from "lucide-react";


// Social sharing component
function SocialShareButtons({ title, url }: { title: string; url: string }) {
  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    alert('Link copied to clipboard!');
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;

  return (
    <div style={{
      display: "flex",
      gap: "16px",
      alignItems: "center",
      marginTop: "24px",
      paddingTop: "24px",
      borderTop: "1px solid var(--border)"
    }}>
      <span style={{ fontSize: "12px", fontWeight: "600", color: "var(--ink3)", textTransform: "uppercase" }}>Share:</span>
      <a href={twitterUrl} target="_blank" rel="noopener noreferrer" style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "8px 12px",
        background: "var(--cream)",
        border: "1px solid var(--border)",
        borderRadius: "2px",
        cursor: "pointer",
        fontSize: "13px",
        fontWeight: "600",
        color: "var(--ink)",
        textDecoration: "none",
        transition: "all 0.2s"
      }} onMouseEnter={(e) => { e.currentTarget.style.background = "var(--gold)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "var(--cream)"; }}>
        𝕏 Twitter
      </a>
      <a href={facebookUrl} target="_blank" rel="noopener noreferrer" style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "8px 12px",
        background: "var(--cream)",
        border: "1px solid var(--border)",
        borderRadius: "2px",
        cursor: "pointer",
        fontSize: "13px",
        fontWeight: "600",
        color: "var(--ink)",
        textDecoration: "none",
        transition: "all 0.2s"
      }} onMouseEnter={(e) => { e.currentTarget.style.background = "var(--gold)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "var(--cream)"; }}>
        f Facebook
      </a>
      <button onClick={handleCopyLink} style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "6px",
        padding: "8px 12px",
        background: "var(--cream)",
        border: "1px solid var(--border)",
        borderRadius: "2px",
        cursor: "pointer",
        fontSize: "13px",
        fontWeight: "600",
        color: "var(--ink)",
        transition: "all 0.2s"
      }} onMouseEnter={(e) => { e.currentTarget.style.background = "var(--gold)"; }} onMouseLeave={(e) => { e.currentTarget.style.background = "var(--cream)"; }}>
        🔗 Copy Link
      </button>
    </div>
  );
}

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [, navigate] = useLocation();
  const [bookmarked, setBookmarked] = useState(false);
  const postsQuery = trpc.posts.listPublished.useQuery();

  // Find the post by slug
  const post = useMemo(() => {
    if (!postsQuery.data || !slug) return null;
    return postsQuery.data.find((p) => p.slug === slug);
  }, [postsQuery.data, slug]);

  if (postsQuery.isLoading) {
    return (
      <Layout>
        <div style={{ padding: "80px 32px", textAlign: "center" }}>
          <div style={{ color: "var(--ink3)" }}>Loading article...</div>
        </div>
      </Layout>
    );
  }

  if (!post) {
    return (
      <Layout>
        <div style={{ padding: "80px 32px", textAlign: "center" }}>
          <h2 style={{ color: "var(--ink)", fontSize: "28px", marginBottom: "20px" }}>Article not found</h2>
          <button
            onClick={() => navigate("/writing")}
            style={{
              padding: "12px 24px",
              background: "var(--gold)",
              color: "var(--ink)",
              border: "none",
              borderRadius: "2px",
              cursor: "pointer",
              fontWeight: "600",
              fontSize: "14px",
              fontFamily: "var(--U)",
            }}
          >
            Back to Writing
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <article>
        {/* BACK BUTTON */}
        <div style={{ padding: "20px 32px", borderBottom: "1px solid var(--border)" }}>
          <button
            onClick={() => navigate("/writing")}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              background: "none",
              border: "none",
              color: "var(--ink3)",
              cursor: "pointer",
              fontSize: "14px",
              fontWeight: "600",
              padding: "0",
              fontFamily: "var(--U)",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink3)")}
          >
            <ArrowLeft size={16} />
            Back to Articles
          </button>
        </div>

        {/* ARTICLE HEADER */}
        <section style={{ padding: "60px 32px 40px", background: "var(--paper)", borderBottom: "1px solid var(--border)" }}>
          <div className="wrap" style={{ maxWidth: "800px" }}>
            {/* TOPIC TAG */}
            <div
              style={{
                display: "inline-block",
                padding: "6px 12px",
                background: "var(--cream)",
                borderRadius: "2px",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  fontSize: "11px",
                  fontWeight: "700",
                  color: "var(--ink3)",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                  fontFamily: "var(--U)",
                }}
              >
                {post.topic?.replace(/-/g, " ").toUpperCase() || "Featured"}
              </span>
            </div>

            {/* TITLE */}
            <h1
              style={{
                fontSize: "clamp(36px, 5vw, 52px)",
                fontWeight: "300",
                lineHeight: "1.15",
                marginBottom: "28px",
                color: "var(--ink)",
                fontFamily: "var(--F)",
                letterSpacing: "-0.015em",
              }}
            >
              {post.title}
            </h1>

            {/* META INFO */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
                paddingBottom: "24px",
                borderBottom: "1px solid var(--border)",
                flexWrap: "wrap",
                fontSize: "14px",
                fontFamily: "var(--U)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--ink3)" }}>
                <User size={16} />
                <span>James Bell</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", color: "var(--ink3)" }}>
                <Clock size={16} />
                <span>{post.readingTimeMinutes || 5} min read</span>
              </div>
              <div style={{ color: "var(--ink3)" }}>
                {post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  : ""}
              </div>
            </div>

            {/* EXCERPT */}
            {post.excerpt && (
              <p
                style={{
                  fontSize: "18px",
                  lineHeight: "1.7",
                  color: "var(--ink3)",
                  fontStyle: "italic",
                  marginTop: "24px",
                }}
              >
                {post.excerpt}
              </p>
            )}
          </div>
        </section>

        {/* FEATURED IMAGE */}
        {post.coverImage && (
          <section style={{ padding: "40px 32px 0" }}>
            <div className="wrap" style={{ maxWidth: "800px" }}>
              <img
                src={post.coverImage}
                alt={post.title}
                style={{
                  width: "100%",
                  borderRadius: "4px",
                  objectFit: "cover",
                  aspectRatio: "16 / 9",
                  marginBottom: "40px",
                }}
              />
            </div>
          </section>
        )}

        {/* ARTICLE CONTENT */}
        <section style={{ padding: "60px 32px" }}>
          <div className="wrap" style={{ maxWidth: "800px" }}>
            <div
              style={{
                fontSize: "17px",
                lineHeight: "1.85",
                color: "var(--ink)",
                marginBottom: "60px",
              }}
            >
              {post.body ? (
                <Streamdown>{post.body}</Streamdown>
              ) : (
                <div style={{ color: "var(--ink3)", fontStyle: "italic", padding: "40px 0" }}>
                  <p>This article content is coming soon.</p>
                </div>
              )}
            </div>

            {/* ARTICLE FOOTER */}
            <div
              style={{
                paddingTop: "32px",
                borderTop: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <button
                  onClick={() => setBookmarked(!bookmarked)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "none",
                    border: "1px solid var(--border)",
                    borderRadius: "2px",
                    padding: "10px 16px",
                    cursor: "pointer",
                    color: bookmarked ? "var(--gold)" : "var(--ink3)",
                    fontSize: "13px",
                    fontWeight: "600",
                    fontFamily: "var(--U)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--gold)";
                    e.currentTarget.style.background = "rgba(196,146,59,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.background = "none";
                  }}
                >
                  <Bookmark size={16} fill={bookmarked ? "currentColor" : "none"} />
                  {bookmarked ? "Saved" : "Save"}
                </button>
                <button
                  onClick={() => {
                    const url = window.location.href;
                    const text = `Check out: ${post.title} by James Bell`;
                    if (navigator.share) {
                      navigator.share({ title: post.title, text, url });
                    } else {
                      navigator.clipboard.writeText(`${text}\n${url}`);
                      alert("Link copied to clipboard!");
                    }
                  }}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    background: "none",
                    border: "1px solid var(--border)",
                    borderRadius: "2px",
                    padding: "10px 16px",
                    cursor: "pointer",
                    color: "var(--ink3)",
                    fontSize: "13px",
                    fontWeight: "600",
                    fontFamily: "var(--U)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--ink3)";
                    e.currentTarget.style.background = "rgba(26,26,26,0.05)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.background = "none";
                  }}
                >
                  <Share2 size={16} />
                  Share
                </button>
              </div>

              <button
                onClick={() => navigate("/writing")}
                style={{
                  padding: "10px 20px",
                  background: "var(--gold)",
                  color: "var(--ink)",
                  border: "none",
                  borderRadius: "2px",
                  cursor: "pointer",
                  fontWeight: "600",
                  fontSize: "13px",
                  fontFamily: "var(--U)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--goldlt)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--gold)";
                }}
              >
                Read More Articles
              </button>
            </div>
          </div>
        </section>

        {/* EMAIL CAPTURE */}
        <section style={{ background: "linear-gradient(135deg, var(--forest) 0%, var(--ink) 100%)", padding: "60px 32px", color: "white" }}>
          <div className="wrap" style={{ maxWidth: "600px", textAlign: "center" }}>
            <h2 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "16px", fontFamily: "var(--F)" }}>
              Get Essays in Your Inbox
            </h2>
            <p style={{ fontSize: "16px", marginBottom: "32px", opacity: 0.95, lineHeight: "1.6" }}>
              Subscribe to receive new essays on faith, culture, and Christian leadership delivered directly to you.
            </p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for subscribing!");
              }}
              style={{
                display: "flex",
                gap: "8px",
                flexDirection: "row",
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              <input
                type="email"
                placeholder="Your email address"
                required
                style={{
                  flex: "1 1 250px",
                  padding: "12px 16px",
                  border: "none",
                  borderRadius: "2px",
                  fontSize: "14px",
                  outline: "none",
                  fontFamily: "inherit",
                }}
              />
              <button
                type="submit"
                style={{
                  padding: "12px 32px",
                  background: "var(--gold)",
                  color: "var(--ink)",
                  border: "none",
                  borderRadius: "2px",
                  fontWeight: "600",
                  fontSize: "14px",
                  cursor: "pointer",
                  fontFamily: "var(--U)",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.opacity = "0.9";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.opacity = "1";
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </section>

        {/* RELATED ARTICLES */}
        <section style={{ background: "white", padding: "60px 32px", borderTop: "1px solid var(--border)" }}>
          <div className="wrap" style={{ maxWidth: "800px" }}>
            <h2 style={{ fontSize: "28px", fontWeight: "600", marginBottom: "40px", color: "var(--ink)", fontFamily: "var(--F)" }}>
              Related Articles
            </h2>
            <div style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "24px"
            }}>
              {postsQuery.data?.filter(p => p.slug !== slug && p.topic === post.topic).slice(0, 3).map(relatedPost => (
                <div key={relatedPost.id} style={{
                  padding: "20px",
                  border: "1px solid var(--border)",
                  borderRadius: "4px",
                  cursor: "pointer",
                  transition: "all 0.2s ease"
                }}
                  onClick={() => navigate(`/articles/${relatedPost.slug}`)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--gold)";
                    e.currentTarget.style.boxShadow = "0 4px 12px rgba(184,150,62,0.1)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--border)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ fontSize: "12px", color: "var(--gold)", fontWeight: "600", marginBottom: "8px", fontFamily: "var(--U)" }}>
                    {relatedPost.topic?.toUpperCase()}
                  </div>
                  <h3 style={{ fontSize: "16px", fontWeight: "600", marginBottom: "12px", color: "var(--ink)", lineHeight: "1.4" }}>
                    {relatedPost.title}
                  </h3>
                  <div style={{ fontSize: "12px", color: "var(--ink3)" }}>
                    {relatedPost.readTime} min read
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AUTHOR BIO */}
        <section style={{ background: "var(--cream)", padding: "60px 32px" }}>
          <div className="wrap" style={{ maxWidth: "800px" }}>
            <div
              style={{
                display: "flex",
                gap: "24px",
                alignItems: "flex-start",
              }}
            >
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_4533_137f3486.jpeg"
                alt="James Bell"
                style={{
                  width: "120px",
                  height: "160px",
                  borderRadius: "4px",
                  objectFit: "cover",
                  objectPosition: "center top",
                  flexShrink: 0,
                }}
              />
              <div>
                <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "8px", color: "var(--ink)", fontFamily: "var(--F)" }}>
                  James Bell
                </h3>
                <div style={{ fontSize: "12px", color: "var(--gold)", fontWeight: "600", fontFamily: "var(--U)", letterSpacing: ".05em", marginBottom: "12px" }}>
                  LEAD TEACHING PASTOR • FOUNDER
                </div>
                <p style={{ fontSize: "14px", color: "var(--ink3)", lineHeight: "1.6", marginBottom: "16px" }}>
                  Lead Teaching Pastor at First Baptist Church in Fenton, Michigan, and founder of the Pastors Connection Network. For over 15 years, James has served in full-time ministry—planting churches, leading revitalization efforts, and consulting with pastors and ministry leaders across the country. Out of his own seasons of burnout and isolation, he founded the Pastors Connection Network, a growing community of leaders committed to gospel-centered relationships and long-term faithfulness in ministry.
                </p>
                <button
                  onClick={() => navigate("/books")}
                  style={{
                    padding: "10px 20px",
                    background: "var(--gold)",
                    color: "var(--ink)",
                    border: "none",
                    borderRadius: "2px",
                    cursor: "pointer",
                    fontWeight: "600",
                    fontSize: "13px",
                    fontFamily: "var(--U)",
                    transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--goldlt)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "var(--gold)";
                  }}
                >
                  View All Books
                </button>
              </div>
            </div>
          </div>
        </section>
      </article>
    </Layout>
  );
}
