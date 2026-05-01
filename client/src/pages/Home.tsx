import { Link } from "wouter";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { SEOMeta } from "@/components/SEOMeta";
import { trpc } from "@/lib/trpc";
import Footer from "@/components/Footer";
import MinimalNav from "@/components/MinimalNav";

export default function Home() {
  const [emailInput, setEmailInput] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const { data: articles } = trpc.posts.listPublished.useQuery();
  const recentArticles = articles?.slice(0, 3) || [];

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes("@")) return;
    setEmailSubmitted(true);
    setEmailInput("");
  };

  const personSchema = {
    "@context": "https://schema.org", "@type": "Person",
    name: "James Bell", url: "https://livewellbyjamesbell.co",
    jobTitle: "Lead Pastor, Author",
    description: "Lead Teaching Pastor at First Baptist Church of Fenton, founder of the Pastors Connection Network, and author of 25 books.",
    sameAs: ["https://pastorsconnectionnetwork.com", "https://www.facebook.com/james.bell.609252"],
  };

  return (
    <div>
      <SEOMeta
        title="LiveWell by James Bell — Theology for Marriage, Family, Faith & Pastoral Ministry"
        description="Connecting the depth of theology to the weight of everyday life. 880+ essays on marriage, parenting, faith, justice, and pastoral ministry."
        url="https://livewellbyjamesbell.co"
        type="website"
        structuredData={personSchema}
      />
      <MinimalNav />

      {/* ═══ HERO ═══ */}
      <section style={{ background: "var(--charcoal)", minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", padding: "6rem 1.5rem 8rem" }}>
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "2rem" }}>
            James Bell — Pastor, Author, Writer
          </div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--bone)", marginBottom: "2rem" }}>
            Connecting the depth of theology to the weight of <em style={{ fontStyle: "italic" }}>everyday life</em>
          </h1>
          <p style={{ fontSize: "1.125rem", lineHeight: 1.7, color: "var(--bone)", opacity: 0.7, maxWidth: "580px", marginBottom: "3rem" }}>
            880+ essays on the things that keep you up at night — marriage under pressure, faith with more questions than answers, and a calling that costs more than anyone told you.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/writing" style={{ textDecoration: "none" }}>
              <button style={{
                background: "var(--bone)", color: "var(--charcoal)",
                border: "none", padding: "1rem 2.5rem",
                fontFamily: "var(--U)", fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.02em",
                borderRadius: "2px", cursor: "pointer",
                transition: "all 240ms cubic-bezier(0.22,1,0.36,1)",
              }}>
                Read the Writing
              </button>
            </Link>
            <Link href="/membership" style={{ textDecoration: "none" }}>
              <button style={{
                background: "transparent", color: "var(--bone)",
                border: "1px solid var(--bone)", padding: "1rem 2.5rem",
                fontFamily: "var(--U)", fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.02em",
                borderRadius: "2px", cursor: "pointer",
                transition: "all 240ms cubic-bezier(0.22,1,0.36,1)",
              }}>
                Become a Member
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ TRUST STRIP ═══ */}
      <section style={{ background: "var(--bone)", padding: "1.5rem" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto", display: "flex", justifyContent: "center", alignItems: "center", gap: "0", flexWrap: "wrap", fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ink-muted)" }}>
          {["25 books published", "Founder, Pastors Connection Network", "Lead Pastor, First Baptist Church of Fenton"].map((item, i) => (
            <span key={i} style={{ padding: "0.5rem 1.25rem" }}>
              {i > 0 && <span style={{ color: "var(--bone-muted)", marginRight: "1.25rem" }}>&middot;</span>}
              {item}
            </span>
          ))}
        </div>
      </section>

      {/* ═══ RECENT WRITING ═══ */}
      <section style={{ background: "var(--bone-warm)", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
          <div style={{ fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "1rem" }}>
            Recent Writing
          </div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "3rem" }}>
            Essays that hold weight
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {recentArticles.map((article: any, i: number) => (
              <Link key={i} href={"/writing/" + article.slug} style={{ textDecoration: "none" }}>
                <article style={{
                  background: "var(--card)", padding: "2rem", borderRadius: "2px",
                  transition: "all 240ms cubic-bezier(0.22,1,0.36,1)", cursor: "pointer", height: "100%",
                  display: "flex", flexDirection: "column",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.4)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "0.75rem" }}>
                    {article.pillar || article.topic || "Essay"}
                  </div>
                  <h3 style={{ fontFamily: "var(--F)", fontSize: "1.375rem", fontWeight: 400, color: "var(--bone)", lineHeight: 1.3, marginBottom: "0.75rem", flex: 1 }}>
                    {article.title}
                  </h3>
                  <div style={{ fontFamily: "var(--U)", fontSize: "0.75rem", color: "var(--bone-muted)" }}>
                    {article.readTime || "5 min read"}
                  </div>
                </article>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: "3rem", textAlign: "center" }}>
            <Link href="/writing" style={{ fontFamily: "var(--U)", fontSize: "0.875rem", fontWeight: 500, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "0.25rem" }}>
              Continue reading
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ BOOKS / AUTHOR ═══ */}
      <section style={{ background: "var(--charcoal)", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem", alignItems: "center" }} className="grid grid-cols-1 md:grid-cols-2">
          <div>
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_4533_137f3486.jpeg" alt="James Bell, Lead Pastor and Author" loading="lazy" style={{ width: "100%", maxWidth: "400px", aspectRatio: "3/4", objectFit: "cover", objectPosition: "center top", borderRadius: "2px" }} />
            <div style={{ width: "60px", height: "2px", background: "var(--mustard)", marginTop: "1.5rem" }} />
          </div>
          <div>
            <div style={{ fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "1rem" }}>
              The Work
            </div>
            <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--bone)", marginBottom: "1.5rem" }}>
              Twenty-five books. One question.
            </h2>
            <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--bone)", opacity: 0.7, marginBottom: "2.5rem", maxWidth: "480px" }}>
              Every book asks the same question from a different angle: What does it look like to follow Jesus when the answers are harder than the songs we sing on Sunday? Theology for marriage. Leadership for pastors. Justice for the silent. Faith for the honest.
            </p>
            <Link href="/books" style={{ textDecoration: "none" }}>
              <button style={{
                background: "var(--bone)", color: "var(--charcoal)",
                border: "none", padding: "1rem 2.5rem",
                fontFamily: "var(--U)", fontSize: "0.875rem", fontWeight: 500,
                borderRadius: "2px", cursor: "pointer",
              }}>
                See all books
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ MEMBERSHIP ═══ */}
      <section style={{ background: "var(--bone)", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "1rem" }}>
            Membership
          </div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "2.5rem" }}>
            For readers who want the full library
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0", marginBottom: "2.5rem", textAlign: "left", maxWidth: "480px", margin: "0 auto 2.5rem" }}>
            {["Full access to 880+ essays across every topic", "Weekly letter with new writing before it goes public", "Member-only tools, reading paths, and resources"].map((line, i) => (
              <div key={i} style={{ padding: "1rem 0", borderTop: i === 0 ? "none" : "1px solid var(--mustard)", fontSize: "1rem", color: "var(--ink)", lineHeight: 1.6 }}>
                {line}
              </div>
            ))}
          </div>
          <Link href="/membership" style={{ textDecoration: "none" }}>
            <button style={{
              background: "var(--ink)", color: "var(--bone)",
              border: "none", padding: "1rem 2.5rem",
              fontFamily: "var(--U)", fontSize: "0.875rem", fontWeight: 500,
              borderRadius: "2px", cursor: "pointer",
            }}>
              Become a member
            </button>
          </Link>
          <p style={{ marginTop: "1rem", fontSize: "0.875rem", color: "var(--ink-muted)" }}>
            Stripe-secured. Cancel anytime.
          </p>
        </div>
      </section>

      {/* ═══ PASTORAL NOTE ═══ */}
      <section style={{ background: "var(--charcoal)", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <blockquote style={{ fontFamily: "var(--F)", fontStyle: "italic", fontSize: "clamp(1.25rem, 3vw, 1.5rem)", lineHeight: 1.65, color: "var(--bone)", borderLeft: "none", padding: 0, margin: "0 0 2rem", position: "relative" }}>
            <div style={{ width: "40px", height: "2px", background: "var(--mustard)", margin: "0 auto 2rem" }} />
            "I write for people who take faith seriously enough to let it cost them something. For the pastor who preached last Sunday with a broken heart. For the couple who kept the vows but lost the thread. For the parent raising questions they cannot answer. For the skeptic who cannot stop reading the words of a man they are not sure they believe in."
          </blockquote>
          <p style={{ fontSize: "0.875rem", color: "var(--bone)", opacity: 0.5, marginBottom: "1.5rem" }}>
            James Bell — Lead Teaching Pastor, First Baptist Church of Fenton
          </p>
          <Link href="/about" style={{ fontFamily: "var(--U)", fontSize: "0.875rem", fontWeight: 500, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "0.25rem" }}>
            More about James
          </Link>
        </div>
      </section>

      {/* ═══ NEWSLETTER ═══ */}
      <section style={{ background: "var(--charcoal-deep)", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", display: "flex", alignItems: "center", gap: "1.5rem", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "200px" }}>
            <div style={{ fontFamily: "var(--F)", fontSize: "1.25rem", color: "var(--bone)", marginBottom: "0.25rem" }}>
              Weekly letter
            </div>
            <div style={{ fontSize: "0.875rem", color: "var(--bone)", opacity: 0.5 }}>
              One essay. For what you are carrying.
            </div>
          </div>
          {emailSubmitted ? (
            <div style={{ fontSize: "0.875rem", color: "var(--mustard)", fontWeight: 500 }}>Welcome. Check your inbox.</div>
          ) : (
            <form onSubmit={handleEmailSubmit} style={{ display: "flex", gap: "0" }}>
              <input type="email" placeholder="your@email.com" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} required
                style={{ padding: "0.75rem 1rem", background: "transparent", border: "1px solid var(--bone-muted)", borderRight: "none", color: "var(--bone)", fontSize: "0.875rem", fontFamily: "var(--U)", minWidth: "200px", borderRadius: "2px 0 0 2px", outline: "none" }}
              />
              <button type="submit" style={{ padding: "0.75rem 1.25rem", background: "var(--mustard)", color: "var(--charcoal)", border: "1px solid var(--mustard)", fontFamily: "var(--U)", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", borderRadius: "0 2px 2px 0", display: "flex", alignItems: "center" }}>
                <ArrowRight size={16} />
              </button>
            </form>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
