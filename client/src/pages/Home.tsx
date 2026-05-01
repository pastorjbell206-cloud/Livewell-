import { Link } from "wouter";
import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { SEOMeta } from "@/components/SEOMeta";
import { trpc } from "@/lib/trpc";
import Footer from "@/components/Footer";
import MinimalNav from "@/components/MinimalNav";
import StickyMobileCTA from "@/components/StickyMobileCTA";

export default function Home() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { data: articles } = trpc.posts.listPublished.useQuery();
  const recent = articles?.slice(0, 6) || [];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSubscribed(true);
    setEmail("");
  };

  const schema = {
    "@context": "https://schema.org", "@type": "WebSite",
    name: "LiveWell by James Bell", url: "https://livewellbyjamesbell.co",
    description: "Theology for marriage, parenting, faith crisis, and doubt. 880+ free essays by James Bell.",
    potentialAction: { "@type": "SearchAction", target: "https://livewellbyjamesbell.co/writing?q={search_term_string}", "query-input": "required name=search_term_string" },
  };

  return (
    <div>
      <SEOMeta
        title="LiveWell by James Bell — Theology for Marriage, Parenting, Faith & Doubt"
        description="Free theology for your actual life. 880+ essays on Christian marriage, parenting with faith, doubt and deconstruction, and reading the Bible honestly. By James Bell, author of 25 books."
        url="https://livewellbyjamesbell.co"
        type="website"
        structuredData={schema}
      />
      <MinimalNav />

      {/* ═══ HERO — short, clear, shows content fast ═══ */}
      <section style={{ background: "var(--charcoal)", padding: "5rem 1.5rem 4rem" }}>
        <div style={{ maxWidth: "740px", margin: "0 auto" }}>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(2.25rem, 6vw, 4rem)", fontWeight: 400, lineHeight: 1.08, letterSpacing: "-0.02em", color: "var(--bone)", marginBottom: "1.25rem" }}>
            Theology for your actual life.
          </h1>
          <p style={{ fontSize: "1.05rem", lineHeight: 1.7, color: "var(--bone)", opacity: 0.6, maxWidth: "520px", marginBottom: "2rem" }}>
            Christian marriage help. Parenting with theological depth. Faith crisis and honest doubt. 880+ free essays. 25 books.
          </p>
          <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <Link href="/writing" style={{ textDecoration: "none" }}>
              <button style={{ background: "var(--bone)", color: "var(--charcoal)", border: "none", padding: "0.85rem 2rem", fontFamily: "var(--U)", fontSize: "0.85rem", fontWeight: 500, borderRadius: "2px", cursor: "pointer" }}>Read the essays</button>
            </Link>
            <Link href="/pastors" style={{ textDecoration: "none" }}>
              <button style={{ background: "transparent", color: "var(--bone)", border: "1px solid rgba(244,241,234,0.2)", padding: "0.85rem 2rem", fontFamily: "var(--U)", fontSize: "0.85rem", fontWeight: 500, borderRadius: "2px", cursor: "pointer" }}>For pastors</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FOUR PILLARS — the clear path ═══ */}
      <section style={{ background: "var(--bone)", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1.25rem" }}>
            {[
              { title: "Theological Depth", desc: "Hard questions. Real scholarship. Reading the Bible without shortcuts.", href: "/writing?topic=theology", keyword: "deep theology" },
              { title: "Prophetic Justice", desc: "Where the church has been silent and what faithfulness demands now.", href: "/writing?topic=justice", keyword: "faith and justice" },
              { title: "Faith & Theology", desc: "Doubt, deconstruction, and the intellectual architecture of belief.", href: "/doubt", keyword: "faith crisis" },
              { title: "Living Well", desc: "Marriage, parenting, finances, emotional health, and the theology beneath everyday decisions.", href: "/marriage", keyword: "Christian living" },
            ].map((p, i) => (
              <Link key={i} href={p.href} style={{ textDecoration: "none" }}>
                <div style={{ padding: "1.75rem", background: "var(--card)", border: "1px solid var(--bone-muted)", borderRadius: "2px", height: "100%", cursor: "pointer", transition: "all 240ms cubic-bezier(0.22,1,0.36,1)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--mustard)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--bone-muted)"; e.currentTarget.style.transform = "none"; }}
                >
                  <h2 style={{ fontFamily: "var(--F)", fontSize: "1.35rem", fontWeight: 400, color: "var(--ink)", marginBottom: "0.5rem" }}>{p.title}</h2>
                  <p style={{ fontSize: "0.85rem", lineHeight: 1.6, color: "var(--ink-muted)", marginBottom: "0.75rem" }}>{p.desc}</p>
                  <span style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mustard-text)", fontFamily: "var(--U)" }}>Read essays <ArrowRight size={11} style={{ display: "inline", verticalAlign: "middle" }} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ RECENT ESSAYS — show content immediately ═══ */}
      <section style={{ background: "var(--bone-warm)", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "1.5rem", fontWeight: 400, color: "var(--ink)", marginBottom: "2rem" }}>Recent essays</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1.25rem" }}>
            {recent.map((a: any, i: number) => (
              <Link key={i} href={"/writing/" + a.slug} style={{ textDecoration: "none" }}>
                <article style={{ background: "var(--card)", padding: "1.5rem", border: "1px solid var(--bone-muted)", borderRadius: "2px", height: "100%", display: "flex", flexDirection: "column", cursor: "pointer", transition: "all 240ms cubic-bezier(0.22,1,0.36,1)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(20,17,12,0.06)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ fontSize: "0.7rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--mustard-text)", fontFamily: "var(--U)", marginBottom: "0.5rem" }}>{a.pillar || a.topic || "Essay"}</div>
                  <h3 style={{ fontFamily: "var(--F)", fontSize: "1.1rem", fontWeight: 400, color: "var(--ink)", lineHeight: 1.3, flex: 1, marginBottom: "0.5rem" }}>{a.title}</h3>
                  <div style={{ fontSize: "0.7rem", color: "var(--ink-muted)", fontFamily: "var(--U)" }}>{a.readTime || "5 min read"}</div>
                </article>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: "2rem", textAlign: "center" }}>
            <Link href="/writing" style={{ fontFamily: "var(--U)", fontSize: "0.85rem", fontWeight: 500, color: "var(--mustard-text)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "0.2rem" }}>
              All 880+ essays <ArrowRight size={12} style={{ display: "inline", verticalAlign: "middle" }} />
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ SUBSCRIBE — one form, no noise ═══ */}
      <section style={{ background: "var(--charcoal)", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "520px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "1.5rem", fontWeight: 400, color: "var(--bone)", marginBottom: "0.75rem" }}>Weekly essay. Free.</h2>
          <p style={{ fontSize: "0.875rem", color: "var(--bone)", opacity: 0.5, marginBottom: "1.5rem" }}>One essay a week on marriage, parenting, faith, or theology. No spam.</p>
          {subscribed ? (
            <p style={{ color: "var(--mustard)", fontWeight: 500, fontFamily: "var(--U)", fontSize: "0.875rem" }}>You are in. Check your inbox.</p>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: "flex", gap: "0", maxWidth: "380px", margin: "0 auto" }}>
              <input type="email" placeholder="your@email.com" value={email} onChange={(e) => setEmail(e.target.value)} required
                style={{ flex: 1, padding: "0.7rem 1rem", background: "transparent", border: "1px solid rgba(244,241,234,0.15)", borderRight: "none", color: "var(--bone)", fontSize: "0.85rem", fontFamily: "var(--U)", borderRadius: "2px 0 0 2px", outline: "none" }}
              />
              <button type="submit" style={{ padding: "0.7rem 1rem", background: "var(--bone)", color: "var(--charcoal)", border: "1px solid var(--bone)", fontFamily: "var(--U)", fontSize: "0.85rem", fontWeight: 500, cursor: "pointer", borderRadius: "0 2px 2px 0" }}>
                Subscribe
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ═══ ABOUT — two sentences, not a biography ═══ */}
      <section style={{ background: "var(--bone)", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", display: "flex", gap: "2rem", alignItems: "center", flexWrap: "wrap" }}>
          <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_4533_137f3486.jpeg" alt="James Bell" loading="lazy" style={{ width: "100px", height: "130px", objectFit: "cover", objectPosition: "center top", borderRadius: "2px", flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: "240px" }}>
            <p style={{ fontFamily: "var(--F)", fontSize: "1rem", lineHeight: 1.65, color: "var(--ink)", marginBottom: "0.75rem" }}>
              James Bell. Lead Pastor. Author of 25 books. Came to faith from atheism. Father of five. Writing from where people fall apart and where they find their footing.
            </p>
            <Link href="/about" style={{ fontFamily: "var(--U)", fontSize: "0.8rem", fontWeight: 500, color: "var(--mustard-text)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "0.15rem" }}>
              Full story
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <StickyMobileCTA />
    </div>
  );
}
