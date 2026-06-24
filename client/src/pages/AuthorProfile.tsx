import { useRoute, Link } from "wouter";
import { ArrowLeft, ArrowRight, Mail, Globe, Facebook, BookOpen } from "lucide-react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { SITE_URL } from "@/lib/site";
import { ArticleCard } from "@/components/ArticleCard";

interface Author {
  id: string;
  name: string;
  slug: string;
  bio: string;
  longBio: string;
  image?: string;
  role: string;
  email?: string;
  website?: string;
  facebook?: string;
  substack?: string;
  articles: Array<{
    id: number;
    slug: string;
    title: string;
    excerpt?: string;
    pillar: string;
    readTime?: number;
    createdAt?: Date;
  }>;
}

const AUTHORS: Record<string, Author> = {
  "james-bell": {
    id: "1",
    name: "James Bell",
    slug: "james-bell",
    bio: "Pastor, author, and theological voice for the thinking Christian",
    longBio:
      "James Bell writes, teaches, and leads from one conviction: behavior modification was never the point. Heart transformation is. He writes from decades inside the room where people fall apart, not from a safe distance. He is the founder of LiveWell and the Pastors Connection Network.",
    role: "Founder & Primary Author",
    email: "Pastorjbell206@gmail.com",
    facebook: "https://facebook.com/james.bell.609252",
    substack: "https://substack.com/@jamesbell333289",
    articles: [
      {
        id: 1,
        slug: "the-calling",
        title: "The Calling",
        excerpt: "Understanding your pastoral calling and how to stay faithful to it.",
        pillar: "Leadership Formation",
        readTime: 8,
      },
      {
        id: 2,
        slug: "burnout-warning-signs",
        title: "Burnout: Warning Signs and Recovery",
        excerpt: "Recognizing the signs of burnout before it's too late.",
        pillar: "Leadership Formation",
        readTime: 7,
      },
    ],
  },
  "pcn": {
    id: "2",
    name: "Pastors Connection Network",
    slug: "pcn",
    bio: "Collective wisdom from pastoral leaders across the globe",
    longBio:
      "The Pastors Connection Network is a community of pastoral leaders committed to theological depth, spiritual formation, and prophetic witness. Through collaborative writing and shared resources, PCN provides a platform for voices that challenge the church to think deeply and act faithfully.",
    role: "Contributing Authors",
    website: "https://pastorsconnectionnetwork.com",
    articles: [
      {
        id: 3,
        slug: "prayer-discipline",
        title: "Prayer as Discipline",
        excerpt: "Building a sustainable prayer life in the midst of ministry demands.",
        pillar: "Leadership Formation",
        readTime: 6,
      },
    ],
  },
};

// Shared inline style fragments referencing the design-system tokens.
const eyebrowStyle: React.CSSProperties = {
  fontSize: "0.75rem",
  fontWeight: 500,
  letterSpacing: "0.18em",
  textTransform: "uppercase",
  color: "var(--mustard)",
  fontFamily: "var(--U)",
};

const linkPill: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: "0.5rem",
  fontFamily: "var(--U)",
  fontSize: "0.8125rem",
  fontWeight: 500,
  color: "var(--bone)",
  textDecoration: "none",
  padding: "0.55rem 1rem",
  border: "1px solid rgba(244,241,234,0.18)",
  borderRadius: "2px",
};

function NotFound() {
  return (
    <Layout>
      <SEOMeta title="Author Not Found" description="The author you are looking for could not be found." noindex />
      <section style={{ background: "var(--bone)", padding: "var(--s-7) 1.5rem", minHeight: "60vh" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <Link
            href="/writing"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--U)",
              fontSize: "0.8125rem",
              fontWeight: 500,
              color: "var(--ink-muted)",
              textDecoration: "none",
              marginBottom: "var(--s-4)",
            }}
          >
            <ArrowLeft size={15} /> Back to the writing
          </Link>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)" }}>
            Author not found
          </h1>
        </div>
      </section>
    </Layout>
  );
}

export function AuthorProfile() {
  const [match, params] = useRoute("/authors/:slug");

  if (!match) {
    return <NotFound />;
  }

  const author = AUTHORS[params?.slug as string];

  if (!author) {
    return <NotFound />;
  }

  const hoursOfReading = Math.round(
    author.articles.reduce((sum, a) => sum + (a.readTime || 5), 0) / 5
  );

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    description: author.bio,
    url: `${SITE_URL}/authors/${author.slug}`,
    jobTitle: author.role,
    ...(author.email ? { email: author.email } : {}),
    sameAs: [author.facebook, author.substack, author.website].filter(Boolean),
  };

  return (
    <Layout>
      <SEOMeta
        title={`${author.name} — ${author.role}`}
        description={author.bio}
        url={`${SITE_URL}/authors/${author.slug}`}
        type="profile"
        structuredData={personSchema}
      />

      {/* HEADER */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-7) 1.5rem var(--s-6)" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <Link
            href="/writing"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontFamily: "var(--U)",
              fontSize: "0.8125rem",
              fontWeight: 500,
              color: "var(--bone)",
              opacity: 0.6,
              textDecoration: "none",
              marginBottom: "var(--s-5)",
            }}
          >
            <ArrowLeft size={15} /> Back to the writing
          </Link>

          <div style={{ ...eyebrowStyle, marginBottom: "1.25rem", display: "block" }}>
            {author.role}
          </div>

          <div style={{ display: "flex", gap: "2.5rem", alignItems: "flex-start", flexWrap: "wrap" }}>
            {author.image && (
              <img
                src={author.image}
                alt={author.name}
                loading="eager"
                width={160}
                height={210}
                style={{
                  width: "160px",
                  height: "210px",
                  objectFit: "cover",
                  objectPosition: "center top",
                  borderRadius: "2px",
                  border: "1px solid rgba(244,241,234,0.1)",
                  flexShrink: 0,
                }}
              />
            )}
            <div style={{ flex: 1, minWidth: "260px" }}>
              <h1
                style={{
                  fontFamily: "var(--F)",
                  fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
                  fontWeight: 400,
                  lineHeight: 1.05,
                  letterSpacing: "-0.02em",
                  color: "var(--bone)",
                  marginBottom: "1.5rem",
                }}
              >
                {author.name}
              </h1>
              <p
                style={{
                  fontFamily: "var(--B)",
                  fontSize: "1.0625rem",
                  lineHeight: 1.7,
                  color: "var(--bone)",
                  opacity: 0.82,
                  maxWidth: "60ch",
                }}
              >
                {author.longBio}
              </p>

              {/* Links — only the real ones render */}
              {(author.email || author.facebook || author.substack || author.website) && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "var(--s-4)" }}>
                  {author.email && (
                    <a href={`mailto:${author.email}`} style={linkPill}>
                      <Mail size={15} /> Email
                    </a>
                  )}
                  {author.facebook && (
                    <a href={author.facebook} target="_blank" rel="noopener noreferrer" style={linkPill}>
                      <Facebook size={15} /> Facebook
                    </a>
                  )}
                  {author.substack && (
                    <a href={author.substack} target="_blank" rel="noopener noreferrer" style={linkPill}>
                      <BookOpen size={15} /> Substack
                    </a>
                  )}
                  {author.website && (
                    <a href={author.website} target="_blank" rel="noopener noreferrer" style={linkPill}>
                      <Globe size={15} /> Website
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-5) 1.5rem" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto", display: "flex", gap: "var(--s-7)", flexWrap: "wrap" }}>
          <div>
            <div style={{ fontFamily: "var(--F)", fontSize: "2.5rem", fontWeight: 400, color: "var(--ink)", lineHeight: 1 }}>
              {author.articles.length}
            </div>
            <p style={{ fontFamily: "var(--U)", fontSize: "0.8125rem", color: "var(--ink-muted)", marginTop: "0.5rem" }}>
              Articles published
            </p>
          </div>
          <div>
            <div style={{ fontFamily: "var(--F)", fontSize: "2.5rem", fontWeight: 400, color: "var(--ink)", lineHeight: 1 }}>
              {hoursOfReading}
            </div>
            <p style={{ fontFamily: "var(--U)", fontSize: "0.8125rem", color: "var(--ink-muted)", marginTop: "0.5rem" }}>
              Hours of reading
            </p>
          </div>
        </div>
      </section>

      {/* ARTICLES */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) 1.5rem var(--s-7)" }}>
        <div style={{ maxWidth: "1120px", margin: "0 auto" }}>
          <div style={{ width: "40px", height: "2px", background: "var(--mustard)", marginBottom: "var(--s-3)" }} />
          <h2
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
              fontWeight: 400,
              letterSpacing: "-0.02em",
              color: "var(--ink)",
              marginBottom: "var(--s-5)",
            }}
          >
            Writing by {author.name}
          </h2>

          {author.articles.length > 0 ? (
            <div
              style={{
                display: "grid",
                gap: "1.5rem",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              }}
            >
              {author.articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  id={article.id}
                  slug={article.slug}
                  title={article.title}
                  excerpt={article.excerpt}
                  pillar={article.pillar}
                  readTime={article.readTime}
                  author={author.name}
                  date={
                    article.createdAt
                      ? new Date(article.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })
                      : undefined
                  }
                />
              ))}
            </div>
          ) : (
            <p style={{ fontFamily: "var(--B)", fontSize: "1rem", color: "var(--ink-muted)" }}>
              No writing published yet.
            </p>
          )}

          <div style={{ marginTop: "var(--s-6)" }}>
            <Link
              href="/writing"
              style={{
                fontFamily: "var(--U)",
                fontSize: "0.875rem",
                fontWeight: 500,
                color: "var(--mustard-text)",
                textDecoration: "none",
                borderBottom: "1px solid var(--mustard)",
                paddingBottom: "0.25rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.4rem",
              }}
            >
              Read all the writing <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
