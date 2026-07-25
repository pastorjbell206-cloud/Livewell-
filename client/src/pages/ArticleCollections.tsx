import { Link } from "wouter";
import { ArrowLeft, Download, DollarSign, Check } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { SITE_URL } from "@/lib/site";

interface ArticleInCollection {
  id: number;
  slug: string;
  title: string;
  excerpt?: string;
  pillar: string;
  readTime?: number;
  author?: string;
}

interface ArticleCollection {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  price: number;
  articles: ArticleInCollection[];
  downloadUrl?: string;
}

const COLLECTIONS: ArticleCollection[] = [
  {
    id: "1",
    slug: "pastoral-health",
    title: "Pastoral Health & Wellness",
    description: "A comprehensive guide to maintaining physical, emotional, and spiritual health in ministry",
    icon: "💪",
    price: 9.99,
    articles: [
      {
        id: 1,
        slug: "burnout-warning-signs",
        title: "Burnout: Warning Signs and Recovery",
        excerpt: "Recognizing the signs of burnout before it's too late.",
        pillar: "Leadership Formation",
        readTime: 7,
        author: "James Bell",
      },
      {
        id: 2,
        slug: "prayer-discipline",
        title: "Prayer as Discipline",
        excerpt: "Building a sustainable prayer life in the midst of ministry demands.",
        pillar: "Leadership Formation",
        readTime: 6,
        author: "James Bell",
      },
      {
        id: 3,
        slug: "sabbath-rest",
        title: "Sabbath: The Rhythm of Rest",
        excerpt: "Why rest is not laziness but obedience to God's design.",
        pillar: "Integrated Life",
        readTime: 8,
        author: "James Bell",
      },
    ],
  },
  {
    id: "2",
    slug: "leadership-essentials",
    title: "Leadership Essentials for Pastors",
    description: "Core principles for effective, faithful pastoral leadership",
    icon: "👥",
    price: 12.99,
    articles: [
      {
        id: 4,
        slug: "the-calling",
        title: "The Calling",
        excerpt: "Understanding your pastoral calling and how to stay faithful to it.",
        pillar: "Leadership Formation",
        readTime: 8,
        author: "James Bell",
      },
      {
        id: 5,
        slug: "vision-casting",
        title: "Vision Casting Without Manipulation",
        excerpt: "Leading people toward God's vision with integrity.",
        pillar: "Leadership Formation",
        readTime: 7,
        author: "James Bell",
      },
      {
        id: 6,
        slug: "difficult-conversations",
        title: "Having Difficult Conversations",
        excerpt: "Facing conflict with wisdom and grace.",
        pillar: "Leadership Formation",
        readTime: 6,
        author: "PCN",
      },
    ],
  },
  {
    id: "3",
    slug: "marriage-family-ministry",
    title: "Marriage & Family in Ministry",
    description: "Protecting and strengthening your marriage and family while serving in ministry",
    icon: "",
    price: 11.99,
    articles: [
      {
        id: 7,
        slug: "marriage-ministry-strain",
        title: "Marriage in Ministry: Common Strains",
        excerpt: "Understanding the unique pressures on pastoral marriages.",
        pillar: "Integrated Life",
        readTime: 7,
        author: "James Bell",
      },
      {
        id: 8,
        slug: "pastors-kids",
        title: "Pastors' Kids: Protecting from Expectations",
        excerpt: "Raising children in ministry without burdening them.",
        pillar: "Integrated Life",
        readTime: 6,
        author: "PCN",
      },
      {
        id: 9,
        slug: "ministry-spouse",
        title: "The Ministry Spouse: Finding Identity",
        excerpt: "Supporting your spouse's unique role and needs.",
        pillar: "Integrated Life",
        readTime: 5,
        author: "James Bell",
      },
    ],
  },
  {
    id: "4",
    slug: "prophetic-witness",
    title: "Prophetic Witness in Culture",
    description: "Speaking truth in a confused age with courage and clarity",
    icon: "",
    price: 10.99,
    articles: [
      {
        id: 10,
        slug: "prophetic-disruption",
        title: "Prophetic Disruption: What Needs Challenging",
        excerpt: "Identifying comfortable assumptions that need to be questioned.",
        pillar: "Prophetic Disruption",
        readTime: 8,
        author: "James Bell",
      },
      {
        id: 11,
        slug: "prophetic-justice",
        title: "Prophetic Justice: What Needs Naming",
        excerpt: "Speaking to injustice with biblical clarity.",
        pillar: "Prophetic Justice",
        readTime: 7,
        author: "PCN",
      },
      {
        id: 12,
        slug: "cultural-engagement",
        title: "Cultural Engagement Without Compromise",
        excerpt: "Engaging culture faithfully as a Christian leader.",
        pillar: "Prophetic Justice",
        readTime: 6,
        author: "James Bell",
      },
    ],
  },
  {
    id: "5",
    slug: "spiritual-formation",
    title: "Spiritual Formation & Prayer",
    description: "Deepening your interior life and prayer practice",
    icon: "",
    price: 9.99,
    articles: [
      {
        id: 13,
        slug: "prayer-foundation",
        title: "Prayer: The Foundation of Ministry",
        excerpt: "Why prayer must come before programs.",
        pillar: "Leadership Formation",
        readTime: 8,
        author: "James Bell",
      },
      {
        id: 14,
        slug: "scripture-meditation",
        title: "Scripture Meditation: Slow Reading",
        excerpt: "Encountering God through careful, contemplative reading.",
        pillar: "Leadership Formation",
        readTime: 6,
        author: "PCN",
      },
      {
        id: 15,
        slug: "solitude-silence",
        title: "Solitude & Silence: Essential Practices",
        excerpt: "Creating space to hear God's voice.",
        pillar: "Leadership Formation",
        readTime: 7,
        author: "James Bell",
      },
    ],
  },
];

const wrap = { maxWidth: "var(--w-default)", margin: "0 auto" } as const;

const WHAT_YOU_GET = [
  "Curated articles on a specific topic",
  "Professional PDF formatting for easy reading",
  "Discussion questions for small groups",
  "Lifetime access to download anytime",
];

export function ArticleCollections() {
  return (
    <Layout>
      <SEOMeta
        title="Article Collections — LiveWell by James Bell"
        description="Curated collections of articles on pastoral health, leadership, marriage, prophetic witness, and spiritual formation — available as downloadable guides."
        url={`${SITE_URL}/article-collections`}
      />

      {/* HERO */}
      <section
        style={{
          background: "var(--charcoal)",
          color: "var(--charcoal-fg)",
          padding: "var(--s-6) var(--s-4) var(--s-5)",
        }}
      >
        <div style={wrap}>
          <Link
            href="/resources"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--U)",
              fontSize: "13px",
              fontWeight: 500,
              color: "rgba(245,240,230,0.65)",
              textDecoration: "none",
              marginBottom: "var(--s-4)",
            }}
          >
            <ArrowLeft size={16} />
            Back to Resources
          </Link>

          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "16px" }}>
            Article Collections
          </div>
          <h1
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(36px, 6vw, 60px)",
              fontWeight: 400,
              lineHeight: 1.04,
              letterSpacing: "-0.025em",
              marginBottom: "18px",
              maxWidth: "20ch",
            }}
          >
            Writing gathered for the weight you carry.
          </h1>
          <p
            style={{
              fontFamily: "var(--B)",
              fontSize: "18px",
              lineHeight: 1.75,
              color: "rgba(245,240,230,0.82)",
              maxWidth: "62ch",
            }}
          >
            Curated collections of articles on a single subject, set in clean PDF guides
            you can read, print, and study with a group — yours for as long as you need them.
          </p>
        </div>
      </section>

      {/* COLLECTIONS GRID */}
      <section style={{ background: "var(--bone)", padding: "var(--s-5) var(--s-4) var(--s-6)" }}>
        <div style={wrap}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(420px, 100%), 1fr))",
              gap: "var(--s-3)",
            }}
          >
            {COLLECTIONS.map((collection, index) => (
              <article
                key={collection.id}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  background: "var(--card)",
                  border: "1px solid rgba(20,17,12,0.08)",
                  borderTop: "3px solid var(--mustard)",
                  borderRadius: "var(--radius-sm)",
                  padding: "var(--s-4)",
                }}
              >
                {/* Header */}
                <div
                  style={{
                    fontFamily: "var(--F)",
                    fontSize: "32px",
                    fontWeight: 400,
                    color: "var(--mustard-text)",
                    lineHeight: 1,
                    marginBottom: "var(--s-2)",
                  }}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
                <h2
                  style={{
                    fontFamily: "var(--F)",
                    fontSize: "26px",
                    fontWeight: 400,
                    lineHeight: 1.15,
                    letterSpacing: "-0.02em",
                    color: "var(--ink)",
                    marginBottom: "10px",
                  }}
                >
                  {collection.title}
                </h2>
                <p
                  style={{
                    fontFamily: "var(--B)",
                    fontSize: "15px",
                    lineHeight: 1.7,
                    color: "var(--ink-muted)",
                    marginBottom: "var(--s-3)",
                  }}
                >
                  {collection.description}
                </p>

                {/* Articles list */}
                <div
                  style={{
                    borderTop: "1px solid rgba(20,17,12,0.1)",
                    paddingTop: "var(--s-2)",
                    marginBottom: "var(--s-3)",
                  }}
                >
                  <div
                    className="eyebrow"
                    style={{ color: "var(--mustard-text)", marginBottom: "var(--s-2)" }}
                  >
                    {collection.articles.length} Articles
                  </div>
                  <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
                    {collection.articles.map((article) => (
                      <li
                        key={article.id}
                        style={{
                          display: "flex",
                          gap: "12px",
                          alignItems: "baseline",
                          fontFamily: "var(--B)",
                          fontSize: "14px",
                          lineHeight: 1.6,
                          color: "var(--ink)",
                          padding: "6px 0",
                        }}
                      >
                        <span
                          style={{
                            color: "var(--mustard-text)",
                            fontWeight: 600,
                            flexShrink: 0,
                          }}
                          aria-hidden="true"
                        >
                          —
                        </span>
                        <span>{article.title}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stats */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    borderTop: "1px solid rgba(20,17,12,0.1)",
                    paddingTop: "var(--s-3)",
                    marginBottom: "var(--s-3)",
                    marginTop: "auto",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--U)",
                      fontSize: "13px",
                      color: "var(--ink-muted)",
                    }}
                  >
                    {Math.round(
                      collection.articles.reduce((sum, a) => sum + (a.readTime || 5), 0) / 5,
                    )}{" "}
                    hours of reading
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--F)",
                      fontSize: "28px",
                      fontWeight: 400,
                      color: "var(--ink)",
                    }}
                  >
                    ${collection.price.toFixed(2)}
                  </span>
                </div>

                {/* CTA */}
                <div style={{ display: "flex", gap: "12px" }}>
                  <button
                    type="button"
                    style={{
                      flex: 1,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      padding: "0.8rem 1rem",
                      background: "var(--charcoal)",
                      color: "var(--charcoal-fg)",
                      fontFamily: "var(--U)",
                      fontSize: "13px",
                      fontWeight: 500,
                      letterSpacing: "0.02em",
                      borderRadius: "var(--radius-sm)",
                      border: "none",
                      borderBottom: "2px solid var(--mustard)",
                      cursor: "pointer",
                      transition: "background 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = "var(--charcoal-deep)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = "var(--charcoal)";
                    }}
                  >
                    <DollarSign size={16} />
                    Buy Now
                  </button>
                  <button
                    type="button"
                    style={{
                      flex: 1,
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "8px",
                      padding: "0.8rem 1rem",
                      background: "transparent",
                      color: "var(--ink)",
                      fontFamily: "var(--U)",
                      fontSize: "13px",
                      fontWeight: 500,
                      letterSpacing: "0.02em",
                      borderRadius: "var(--radius-sm)",
                      border: "1px solid rgba(20,17,12,0.2)",
                      cursor: "pointer",
                      transition: "border-color 0.2s",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--mustard)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "rgba(20,17,12,0.2)";
                    }}
                  >
                    <Download size={16} />
                    Preview
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU GET */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ ...wrap, maxWidth: "var(--w-content)" }}>
          <div className="eyebrow" style={{ marginBottom: "16px" }}>
            What You Get
          </div>
          <h2
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(28px, 4vw, 40px)",
              fontWeight: 400,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              marginBottom: "var(--s-4)",
              maxWidth: "20ch",
            }}
          >
            Built to be read, not skimmed.
          </h2>
          <ul
            style={{
              listStyle: "none",
              padding: 0,
              margin: 0,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(min(280px, 100%), 1fr))",
              gap: "var(--s-2) var(--s-4)",
            }}
          >
            {WHAT_YOU_GET.map((item) => (
              <li
                key={item}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "12px",
                  fontFamily: "var(--B)",
                  fontSize: "16px",
                  lineHeight: 1.6,
                  color: "var(--ink)",
                  padding: "var(--s-2) 0",
                  borderTop: "1px solid rgba(20,17,12,0.1)",
                }}
              >
                <Check
                  size={18}
                  style={{ color: "var(--mustard-text)", flexShrink: 0, marginTop: "3px" }}
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </Layout>
  );
}
