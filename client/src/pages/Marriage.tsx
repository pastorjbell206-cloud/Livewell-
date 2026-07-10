import { Link } from "wouter";
import { SEOMeta } from "@/components/SEOMeta";
import MinimalNav from "@/components/MinimalNav";
import Footer from "@/components/Footer";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import { CrisisHelp } from "@/components/CrisisHelp";
import { StatementBand, SectionArt } from "@/components/EditorialBlocks";

export default function Marriage() {

  const FEATURED_ARTICLES = [
    {
      title: "Covenant vs. Contract: What Marriage Actually Is",
      slug: "covenant-vs-contract-what-marriage-is",
      topic: "Marriage",
      readTime: "18 min read"
    },
    {
      title: "Communication That Actually Works",
      slug: "marriage-communication-that-works",
      topic: "Marriage",
      readTime: "9 min read"
    },
    {
      title: "Fighting Fair: Conflict Without Casualties",
      slug: "marriage-fighting-fair",
      topic: "Marriage",
      readTime: "9 min read"
    },
    {
      title: "Forgiveness in Marriage: How to Actually Do It",
      slug: "forgiveness-in-marriage",
      topic: "Marriage",
      readTime: "11 min read"
    },
    {
      title: "Money and Marriage",
      slug: "marriage-money-and-marriage",
      topic: "Marriage",
      readTime: "9 min read"
    },
    {
      title: "Protecting Your Marriage From the Demands of Work",
      slug: "protecting-your-marriage-from-work",
      topic: "Marriage",
      readTime: "12 min read"
    }
  ];

  const READING_PATHS = [
    {
      title: "Marriage Covenant",
      description: "What covenant means, what you promised, and how to keep vows when love feels impossible.",
      articles: 5
    },
    {
      title: "Communication & Conflict",
      description: "How to fight fair, have the conversations you've been avoiding, and repair after rupture.",
      articles: 8
    },
    {
      title: "Marriage in Ministry",
      description: "The unique pressures pastors' marriages face and how to protect your partnership.",
      articles: 4
    }
  ];

  return (
    <div style={{ background: "var(--bone)" }}>
      <SEOMeta
        title="Christian Marriage Help | LiveWell by James Bell"
        description="Covenant theology applied to marriage: articles on communication, conflict, and emotional labor, for couples who want more than advice."
        keywords="Christian marriage help, biblical marriage, marriage counseling, marriage conflict, marriage communication, keeping marriage vows"
        url="https://www.livewellbyjamesbell.co/marriage"
        type="webpage"
      />

      <MinimalNav />
      <main id="main">

      {/* HERO SECTION */}
      <section style={{ background: "var(--ink)", color: "#ffffff", padding: "80px 20px", minHeight: "600px", display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: "bold", lineHeight: "1.2", marginBottom: "24px", fontFamily: "var(--F)" }}>
            When Your Marriage Needs More Than Advice
          </h1>
          <p style={{ fontSize: "18px", lineHeight: "1.8", marginBottom: "32px", color: "rgba(255,255,255,0.75)" }}>
            Covenant theology applied to the actual experience of marriage — the drift, the conflict, the repair, and the costly love that holds.
          </p>
          <Link href="/tools/marriage-assessment" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--gold)", color: "var(--ink)", border: "none", padding: "16px 40px", fontSize: "16px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer" }}>
              Marriage Health Assessment
            </button>
          </Link>
        </div>
      </section>

      {/* FEATURED ARTICLES */}
      <section style={{ background: "var(--bone)", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "48px", fontFamily: "var(--F)", color: "var(--ink)" }}>
            Essential Reading
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: "32px" }}>
            {FEATURED_ARTICLES.map((article, i) => (
              <Link key={i} href={"/writing/" + article.slug} style={{ textDecoration: "none" }}>
                <div style={{ background: "var(--card)", padding: "32px", borderRadius: "8px", border: "1px solid var(--bone-muted)", cursor: "pointer", height: "100%", display: "flex", flexDirection: "column", transition: "all 0.3s ease" }}>
                  <div style={{ fontSize: "11px", fontWeight: "bold", color: "var(--gold)", marginBottom: "12px", textTransform: "uppercase" }}>
                    {article.topic}
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px", color: "var(--ink)", flex: 1, lineHeight: "1.4" }}>
                    {article.title}
                  </h3>
                  <div style={{ fontSize: "12px", color: "var(--ink3)" }}>
                    {article.readTime}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <StatementBand tone="dark" eyebrow="Covenant, not contract">
        A covenant is kept on the days the feeling is gone.
      </StatementBand>

      {/* READING PATHS */}
      <section style={{ background: "var(--paper2)", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "12px", fontFamily: "var(--F)", color: "var(--ink)" }}>
            Curated Reading Paths
          </h2>
          <p style={{ fontSize: "16px", color: "var(--ink3)", marginBottom: "48px" }}>
            Thematic collections to go deeper on specific areas of your marriage.
          </p>
          <SectionArt seed="marriage-paths" />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: "32px" }}>
            {READING_PATHS.map((path, i) => (
              <div key={i} style={{ background: "var(--card)", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--bone-muted)", borderLeft: "3px solid var(--gold)", padding: "28px", cursor: "pointer" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px", color: "var(--ink)" }}>
                  {path.title}
                </h3>
                <p style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--ink3)", marginBottom: "16px" }}>
                  {path.description}
                </p>
                <div style={{ fontSize: "12px", fontWeight: "bold", color: "var(--gold)" }}>
                  {path.articles} articles in this path
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER STRIP — real form, no silent failures */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <NewsletterSignup
            variant="inline"
            source="marriage"
            title="Marriage essays on Tuesday morning."
            description="Covenant, conflict, repair. One essay a week to your inbox. Written from inside the room where marriages actually fall apart and come back together."
          />
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ background: "var(--bone)", padding: "80px 20px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px", fontFamily: "var(--F)", color: "var(--ink)" }}>
            Your marriage can be more than you thought possible.
          </h2>
          <p style={{ fontSize: "16px", lineHeight: "1.8", marginBottom: "32px", color: "var(--ink3)" }}>
            Start with the Marriage Health Assessment. It takes 10 minutes and will show you exactly where your marriage is strongest and where repair work begins.
          </p>
          <Link href="/tools/marriage-assessment" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--ink)", color: "#ffffff", border: "none", padding: "16px 40px", fontSize: "16px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer" }}>
              Take the Assessment
            </button>
          </Link>
          <div style={{ marginTop: "20px" }}>
            <Link href="/life/marriage-the-long-covenant" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)", textDecoration: "none" }}>Or read the deep guide: Marriage, the Long Covenant</Link>
          </div>
          <div style={{ marginTop: "12px" }}>
            <Link href="/diagnostic" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)", textDecoration: "none" }}>If the trouble is bigger than the marriage: take the Life Diagnostic</Link>
          </div>
        </div>
      </section>

      <CrisisHelp />
      </main>
      <Footer />
    </div>
  );
}
