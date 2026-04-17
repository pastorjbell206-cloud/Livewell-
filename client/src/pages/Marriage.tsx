import { Link } from "wouter";
import { useState } from "react";
import { SEOMeta } from "@/components/SEOMeta";
import MinimalNav from "@/components/MinimalNav";
import Footer from "@/components/Footer";

export default function Marriage() {
  const [emailInput, setEmailInput] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const FEATURED_ARTICLES = [
    {
      title: "When You Married Someone You No Longer Recognize",
      slug: "when-you-married-someone-you-no-longer-recognize",
      topic: "Marriage",
      readTime: "8 min read"
    },
    {
      title: "The Slow Drift That Ends More Marriages Than Dramatic Betrayal Does",
      slug: "the-slow-drift-that-ends-marriages",
      topic: "Marriage",
      readTime: "10 min read"
    },
    {
      title: "The Resentment in Your Marriage Is Telling You Something Worth Hearing",
      slug: "the-resentment-in-your-marriage",
      topic: "Marriage",
      readTime: "9 min read"
    },
    {
      title: "What the Bible Actually Says About Submission and What It Doesn't",
      slug: "what-the-bible-says-about-submission",
      topic: "Marriage",
      readTime: "12 min read"
    },
    {
      title: "When One Spouse Carries the Emotional Labor and the Other Doesn't Know It",
      slug: "emotional-labor-in-marriage",
      topic: "Marriage",
      readTime: "11 min read"
    },
    {
      title: "Protecting Your Marriage When Ministry Demands Everything",
      slug: "protecting-marriage-in-ministry",
      topic: "Marriage",
      readTime: "10 min read"
    }
  ];

  const READING_PATHS = [
    {
      title: "Marriage Covenant",
      description: "What covenant means, what you promised, and how to keep vows when love feels impossible.",
      articles: 8
    },
    {
      title: "Communication & Conflict",
      description: "How to fight fair, have the conversations you've been avoiding, and repair after rupture.",
      articles: 12
    },
    {
      title: "Marriage in Ministry",
      description: "The unique pressures pastors' marriages face and how to protect your partnership.",
      articles: 6
    }
  ];

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;
    setEmailSubmitted(true);
    setEmailInput('');
  };

  return (
    <div style={{ background: "#F7F5F0" }}>
      <SEOMeta
        title="Christian Marriage Help | LiveWell by James Bell"
        description="Covenant theology applied to marriage. Articles on communication, conflict resolution, emotional labor, and biblical marriage for couples seeking more than advice."
        keywords="Christian marriage help, biblical marriage, marriage counseling, marriage conflict, marriage communication, keeping marriage vows"
        url="https://livewellbyjamesbell.co/marriage"
        type="webpage"
      />

      <MinimalNav />

      {/* HERO SECTION */}
      <section style={{ background: "#2D4A3E", color: "#F7F5F0", padding: "80px 20px", minHeight: "600px", display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: "bold", lineHeight: "1.2", marginBottom: "24px", fontFamily: "Georgia, serif" }}>
            When Your Marriage Needs More Than Advice
          </h1>
          <p style={{ fontSize: "18px", lineHeight: "1.8", marginBottom: "32px", color: "#D1C9BB" }}>
            Covenant theology applied to the actual experience of marriage — the drift, the conflict, the repair, and the costly love that holds.
          </p>
          <Link href="/marriage/assessment" style={{ textDecoration: "none" }}>
            <button style={{ background: "#B8963E", color: "#1A1A1A", border: "none", padding: "16px 40px", fontSize: "16px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer" }}>
              Marriage Health Assessment
            </button>
          </Link>
        </div>
      </section>

      {/* FEATURED ARTICLES */}
      <section style={{ background: "#F7F5F0", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "48px", fontFamily: "Georgia, serif", color: "#1A1A1A" }}>
            Essential Reading
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "32px" }}>
            {FEATURED_ARTICLES.map((article, i) => (
              <Link key={i} href={"/writing/" + article.slug} style={{ textDecoration: "none" }}>
                <div style={{ background: "#FFF", padding: "32px", borderRadius: "8px", border: "1px solid #E0D9CC", cursor: "pointer", height: "100%", display: "flex", flexDirection: "column", transition: "all 0.3s ease" }}>
                  <div style={{ fontSize: "11px", fontWeight: "bold", color: "#B8963E", marginBottom: "12px", textTransform: "uppercase" }}>
                    {article.topic}
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px", color: "#1A1A1A", flex: 1, lineHeight: "1.4" }}>
                    {article.title}
                  </h3>
                  <div style={{ fontSize: "12px", color: "#6B7280" }}>
                    {article.readTime}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* READING PATHS */}
      <section style={{ background: "#F0EDE5", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "12px", fontFamily: "Georgia, serif", color: "#1A1A1A" }}>
            Curated Reading Paths
          </h2>
          <p style={{ fontSize: "16px", color: "#6B7280", marginBottom: "48px" }}>
            Thematic collections to go deeper on specific areas of your marriage.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
            {READING_PATHS.map((path, i) => (
              <div key={i} style={{ background: "#FFF", borderRadius: "8px", overflow: "hidden", border: "1px solid #E0D9CC", borderLeft: "8px solid #B8963E", padding: "28px", cursor: "pointer" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px", color: "#1A1A1A" }}>
                  {path.title}
                </h3>
                <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#6B7280", marginBottom: "16px" }}>
                  {path.description}
                </p>
                <div style={{ fontSize: "12px", fontWeight: "bold", color: "#B8963E" }}>
                  {path.articles} articles in this path
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER STRIP */}
      <section style={{ background: "#2D4A3E", color: "#F7F5F0", padding: "60px 20px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px", fontFamily: "Georgia, serif" }}>
            Marriage insights for your inbox.
          </h2>
          <p style={{ fontSize: "14px", lineHeight: "1.8", marginBottom: "32px", color: "#D1C9BB" }}>
            Essays, devotionals, and conversation starters delivered twice a week. For couples ready to go deeper.
          </p>
          {emailSubmitted ? (
            <p style={{ color: "#B8963E", fontWeight: "bold", fontSize: "16px" }}>
              Check your inbox. You're in.
            </p>
          ) : (
            <form onSubmit={handleEmailSubmit} style={{ display: "flex", gap: "12px", maxWidth: "500px", margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
              <input
                type="email"
                placeholder="your@email.com"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                required
                style={{ flex: 1, minWidth: "200px", padding: "12px 16px", border: "none", borderRadius: "4px", fontSize: "14px" }}
              />
              <button type="submit" style={{ background: "#B8963E", color: "#1A1A1A", border: "none", padding: "12px 24px", fontSize: "14px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer", whiteSpace: "nowrap" }}>
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ background: "#F7F5F0", padding: "80px 20px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px", fontFamily: "Georgia, serif", color: "#1A1A1A" }}>
            Your marriage can be more than you thought possible.
          </h2>
          <p style={{ fontSize: "16px", lineHeight: "1.8", marginBottom: "32px", color: "#6B7280" }}>
            Start with the Marriage Health Assessment. It takes 10 minutes and will show you exactly where your marriage is strongest and where repair work begins.
          </p>
          <Link href="/marriage/assessment" style={{ textDecoration: "none" }}>
            <button style={{ background: "#2D4A3E", color: "#F7F5F0", border: "none", padding: "16px 40px", fontSize: "16px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer" }}>
              Take the Assessment
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
