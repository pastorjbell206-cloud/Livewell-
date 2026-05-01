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
  const recentArticles = articles?.slice(0, 6) || [];
  const featuredArticle = articles?.[0];

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

  const S = { eyebrow: { fontFamily: "var(--U)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase" as const, color: "var(--goldlt)", marginBottom: "1rem" } };

  return (
    <div>
      <SEOMeta title="LiveWell by James Bell — Theology for Marriage, Family, Faith & Pastoral Ministry" description="Connecting the depth of theology to the weight of everyday life. 880+ essays on marriage, parenting, faith, justice, and pastoral ministry." url="https://livewellbyjamesbell.co" type="website" structuredData={personSchema} />
      <MinimalNav />

      {/* ═══ 1. HERO ═══ */}
      <section style={{ background: "var(--charcoal)", minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", padding: "6rem 1.5rem 8rem" }}>
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <div style={{ ...S.eyebrow, marginBottom: "2rem" }}>James Bell — Pastor, Author, Writer</div>
          <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(2.5rem, 7vw, 6rem)", fontWeight: 400, lineHeight: 1.05, letterSpacing: "-0.02em", color: "var(--bone)", marginBottom: "2rem" }}>
            Connecting the depth of theology to the weight of <em style={{ fontStyle: "italic" }}>everyday life</em>
          </h1>
          <p style={{ fontSize: "1.125rem", lineHeight: 1.7, color: "var(--bone)", opacity: 0.65, maxWidth: "560px", marginBottom: "3rem" }}>
            For the marriage under pressure, the faith with harder questions than it used to have, and the calling that costs more than anyone said it would. 880+ essays. 25 books. Written from the room where people fall apart.
          </p>
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Link href="/writing" style={{ textDecoration: "none" }}>
              <button style={{ background: "var(--bone)", color: "var(--charcoal)", border: "none", padding: "1rem 2.5rem", fontFamily: "var(--U)", fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.02em", borderRadius: "2px", cursor: "pointer" }}>Read the Writing</button>
            </Link>
            <Link href="/membership" style={{ textDecoration: "none" }}>
              <button style={{ background: "transparent", color: "var(--bone)", border: "1px solid rgba(244,241,234,0.25)", padding: "1rem 2.5rem", fontFamily: "var(--U)", fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.02em", borderRadius: "2px", cursor: "pointer" }}>Become a Member</button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ 2. AUDIENCE ROUTES ═══ */}
      <section style={{ background: "var(--bone)", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
          <div style={S.eyebrow}>Where are you starting from?</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "3rem" }}>Four doors. Same room.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.5rem" }}>
            {[
              { label: "I am skeptical of all of this", desc: "You have been handed answers that insult your intelligence. Start with essays that name the problem honestly.", href: "/doubt" },
              { label: "I am a Christian who wants depth", desc: "Slogans stopped working. You need theology that holds the weight of a real Tuesday afternoon.", href: "/writing" },
              { label: "I am a pastor", desc: "You preach every Sunday and nobody preaches to you. The Pastors Connection Network was built because that silence is killing leaders.", href: "/pastors" },
              { label: "I am trying to live well", desc: "Marriage. Parenting. Vocation. You need someone who writes about faith the way you actually live it.", href: "/marriage" },
            ].map((route, i) => (
              <Link key={i} href={route.href} style={{ textDecoration: "none" }}>
                <div style={{ background: "var(--card)", border: "1px solid var(--bone-muted)", padding: "2rem", borderRadius: "2px", height: "100%", display: "flex", flexDirection: "column", cursor: "pointer", transition: "all 240ms cubic-bezier(0.22,1,0.36,1)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "var(--mustard)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "var(--bone-muted)"; e.currentTarget.style.transform = "none"; }}
                >
                  <h3 style={{ fontFamily: "var(--F)", fontSize: "1.25rem", fontWeight: 400, fontStyle: "italic", color: "var(--ink)", marginBottom: "0.75rem", lineHeight: 1.3 }}>{route.label}</h3>
                  <p style={{ fontSize: "0.875rem", lineHeight: 1.7, color: "var(--ink-muted)", flex: 1 }}>{route.desc}</p>
                  <div style={{ marginTop: "1rem", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--goldlt)" }}>Begin reading</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ 3. FEATURED ESSAY ═══ */}
      {featuredArticle && (
        <section style={{ background: "var(--charcoal)", padding: "6rem 1.5rem" }}>
          <div style={{ maxWidth: "680px", margin: "0 auto" }}>
            <div style={S.eyebrow}>Featured Essay</div>
            <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--bone)", marginBottom: "1.5rem", lineHeight: 1.15 }}>
              {featuredArticle.title}
            </h2>
            {featuredArticle.excerpt && (
              <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--bone)", opacity: 0.65, marginBottom: "1.5rem" }}>{featuredArticle.excerpt}</p>
            )}
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
              <span style={{ fontSize: "0.75rem", color: "var(--bone)", opacity: 0.4, fontFamily: "var(--U)" }}>{featuredArticle.readTime || "5 min read"}</span>
              <span style={{ fontSize: "0.75rem", color: "var(--bone)", opacity: 0.4, fontFamily: "var(--U)" }}>{featuredArticle.pillar || "Essay"}</span>
            </div>
            <Link href={"/writing/" + featuredArticle.slug} style={{ fontFamily: "var(--U)", fontSize: "0.875rem", fontWeight: 500, color: "var(--goldlt)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "0.25rem" }}>
              Read the full essay
            </Link>
          </div>
        </section>
      )}

      {/* ═══ 4. TRUST STRIP ═══ */}
      <section style={{ background: "var(--bone-warm)", padding: "3rem 1.5rem", borderTop: "1px solid var(--bone-muted)", borderBottom: "1px solid var(--bone-muted)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto", display: "flex", justifyContent: "center", gap: "3rem", flexWrap: "wrap", textAlign: "center" }}>
          {[
            { n: "25", u: "Books" },
            { n: "880+", u: "Essays" },
            { n: "1,000+", u: "Pastors in PCN" },
            { n: "15", u: "Years in Ministry" },
          ].map((s, i) => (
            <div key={i}>
              <div style={{ fontFamily: "var(--F)", fontSize: "2.5rem", fontWeight: 400, color: "var(--ink)", lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--goldlt)", fontFamily: "var(--U)", marginTop: "0.5rem" }}>{s.u}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 5. WRITING PULSE ═══ */}
      <section style={{ background: "var(--bone)", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "1180px", margin: "0 auto" }}>
          <div style={S.eyebrow}>Recent Writing</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "3rem" }}>Essays that hold weight</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {recentArticles.map((article: any, i: number) => (
              <Link key={i} href={"/writing/" + article.slug} style={{ textDecoration: "none" }}>
                <article style={{ background: "var(--card)", padding: "2rem", borderRadius: "2px", border: "1px solid var(--bone-muted)", transition: "all 240ms cubic-bezier(0.22,1,0.36,1)", cursor: "pointer", height: "100%", display: "flex", flexDirection: "column" }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.06)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "none"; }}
                >
                  <div style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--goldlt)", fontFamily: "var(--U)", marginBottom: "0.75rem" }}>{article.pillar || article.topic || "Essay"}</div>
                  <h3 style={{ fontFamily: "var(--F)", fontSize: "1.25rem", fontWeight: 400, color: "var(--ink)", lineHeight: 1.3, marginBottom: "0.75rem", flex: 1 }}>{article.title}</h3>
                  <div style={{ fontSize: "0.75rem", color: "var(--ink-muted)", fontFamily: "var(--U)" }}>{article.readTime || "5 min read"}</div>
                </article>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: "3rem", textAlign: "center" }}>
            <Link href="/writing" style={{ fontFamily: "var(--U)", fontSize: "0.875rem", fontWeight: 500, color: "var(--goldlt)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "0.25rem" }}>See the full archive <ArrowRight size={14} style={{ display: "inline", verticalAlign: "middle" }} /></Link>
          </div>
        </div>
      </section>

      {/* ═══ 6. BOOKS AS READING PATHS ═══ */}
      <section style={{ background: "var(--charcoal)", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "880px", margin: "0 auto" }}>
          <div style={{ ...S.eyebrow, color: "var(--mustard)" }}>The Books</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--bone)", marginBottom: "1rem" }}>Twenty-five books. Read them as paths, not a list.</h2>
          <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--bone)", opacity: 0.6, marginBottom: "3rem", maxWidth: "560px" }}>Every book asks the same question from a different angle: what does it look like to follow Jesus when the answers are harder than the songs?</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              { path: "If you are wrestling with doubt", books: "The Monster in the Mirror, When God Bless America Replaces Thy Kingdom Come", href: "/books" },
              { path: "If you are burned out in ministry", books: "Dangerous Calling, The Hidden Life, Why We Need Each Other", href: "/books" },
              { path: "If your marriage is under strain", books: "The First Flock, Earthen Vessels", href: "/books" },
            ].map((p, i) => (
              <Link key={i} href={p.href} style={{ textDecoration: "none" }}>
                <div style={{ padding: "1.5rem 2rem", border: "1px solid rgba(244,241,234,0.1)", borderLeft: "2px solid var(--mustard)", borderRadius: "2px", cursor: "pointer", transition: "all 240ms cubic-bezier(0.22,1,0.36,1)" }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(244,241,234,0.2)"; e.currentTarget.style.background = "rgba(244,241,234,0.03)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(244,241,234,0.1)"; e.currentTarget.style.background = "transparent"; }}
                >
                  <div style={{ fontFamily: "var(--F)", fontSize: "1.125rem", fontWeight: 400, fontStyle: "italic", color: "var(--bone)", marginBottom: "0.5rem" }}>{p.path}</div>
                  <div style={{ fontSize: "0.8rem", color: "var(--bone)", opacity: 0.45, fontFamily: "var(--U)" }}>{p.books}</div>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ marginTop: "3rem" }}>
            <Link href="/books" style={{ fontFamily: "var(--U)", fontSize: "0.875rem", fontWeight: 500, color: "var(--goldlt)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "0.25rem" }}>See all 25 books</Link>
          </div>
        </div>
      </section>

      {/* ═══ 7. ABOUT SNAPSHOT ═══ */}
      <section style={{ background: "var(--bone-warm)", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "880px", margin: "0 auto", display: "flex", gap: "3rem", alignItems: "center", flexWrap: "wrap" }}>
          <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_4533_137f3486.jpeg" alt="James Bell" loading="lazy" style={{ width: "180px", height: "240px", objectFit: "cover", objectPosition: "center top", borderRadius: "2px", border: "1px solid var(--bone-muted)", flexShrink: 0 }} />
          <div style={{ flex: 1, minWidth: "280px" }}>
            <div style={S.eyebrow}>About James Bell</div>
            <p style={{ fontFamily: "var(--F)", fontSize: "1.125rem", lineHeight: 1.65, color: "var(--ink)", marginBottom: "1rem" }}>
              He came to faith from atheism. He was raised without a father. He has five sons. Those three facts shape everything he writes. Lead Teaching Pastor at First Baptist Church of Fenton, founder of the Pastors Connection Network, author of 25 books — writing from the room where people fall apart and the room where they find their footing.
            </p>
            <Link href="/about" style={{ fontFamily: "var(--U)", fontSize: "0.875rem", fontWeight: 500, color: "var(--goldlt)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "0.25rem" }}>Read the full story</Link>
          </div>
        </div>
      </section>

      {/* ═══ 8. MEMBERSHIP INVITATION ═══ */}
      <section style={{ background: "var(--bone)", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto", textAlign: "center" }}>
          <div style={S.eyebrow}>Membership</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(1.75rem, 3vw, 2.25rem)", fontWeight: 400, letterSpacing: "-0.02em", color: "var(--ink)", marginBottom: "2rem" }}>For readers who want the full library</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0", marginBottom: "2rem", textAlign: "left", maxWidth: "480px", margin: "0 auto 2rem" }}>
            {["Full access to 880+ essays across every topic and audience", "Weekly letter with new writing before it goes public", "Member-only tools, reading paths, and curated resources"].map((line, i) => (
              <div key={i} style={{ padding: "1rem 0", borderTop: i > 0 ? "1px solid var(--mustard)" : "none", fontSize: "1rem", color: "var(--ink)", lineHeight: 1.6 }}>{line}</div>
            ))}
          </div>
          <Link href="/membership" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--charcoal)", color: "var(--bone)", border: "none", padding: "1rem 2.5rem", fontFamily: "var(--U)", fontSize: "0.875rem", fontWeight: 500, letterSpacing: "0.02em", borderRadius: "2px", cursor: "pointer" }}>Join the waitlist</button>
          </Link>
          <p style={{ marginTop: "0.75rem", fontSize: "0.8rem", color: "var(--ink-muted)" }}>Stripe-secured. Cancel anytime.</p>
        </div>
      </section>

      {/* ═══ 9. FAQ ═══ */}
      <section style={{ background: "var(--bone-warm)", padding: "6rem 1.5rem" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <div style={S.eyebrow}>Questions</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 400, color: "var(--ink)", marginBottom: "3rem" }}>What you might be wondering</h2>
          {[
            { q: "Why should I read another Christian writer when I am tired of the genre?", a: "Because this is not the genre you are tired of. No slogans, no positivity culture, no promises that God has a plan for your mortgage. This is theology that names the cost and stays in the room." },
            { q: "I am not a Christian. Is this site for me?", a: "It was written for you first. The skeptic is the hardest case, which is why it is the most important one. Read the essays on doubt. If they insult your intelligence, leave. They will not." },
            { q: "I am a pastor. What is here for me specifically?", a: "Sermon resources, pastoral ministry essays on burnout and isolation, and the Pastors Connection Network — a community of over 1,000 pastors built because the loneliness of ministry is a crisis nobody says out loud." },
            { q: "What is the membership and is it worth it?", a: "Full access to the essay archive, early access to new writing, member-only tools and reading paths. Stripe coming soon — join the waitlist to be first in." },
            { q: "How is this different from the Substack?", a: "Substack delivers the weekly letter. This site is the full library — 880+ essays searchable by topic, tools you can use, books organized as reading paths, and a membership that gives you everything in one place." },
            { q: "Can I write to James directly?", a: "Yes. The contact page reaches him at Pastorjbell206@gmail.com. He reads every message." },
          ].map((faq, i) => (
            <div key={i} style={{ borderBottom: "1px solid var(--bone-muted)", paddingBottom: "1.5rem", marginBottom: "1.5rem" }}>
              <h3 style={{ fontFamily: "var(--F)", fontSize: "1.125rem", fontWeight: 400, color: "var(--ink)", marginBottom: "0.5rem", lineHeight: 1.4 }}>{faq.q}</h3>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--ink-muted)" }}>{faq.a}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ 10. FINAL CTA ═══ */}
      <section style={{ background: "var(--charcoal)", padding: "6rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <div style={{ width: "40px", height: "2px", background: "var(--mustard)", margin: "0 auto 2rem" }} />
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(1.5rem, 3vw, 2rem)", fontWeight: 400, fontStyle: "italic", color: "var(--bone)", marginBottom: "1.5rem", lineHeight: 1.3 }}>
            The cost of staying where you are is higher than the cost of reading something that tells the truth.
          </h2>
          {emailSubmitted ? (
            <p style={{ color: "var(--mustard)", fontWeight: 500, fontFamily: "var(--U)" }}>Welcome. Check your inbox.</p>
          ) : (
            <form onSubmit={handleEmailSubmit} style={{ display: "flex", gap: "0", justifyContent: "center", maxWidth: "420px", margin: "0 auto" }}>
              <input type="email" placeholder="your@email.com" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} required style={{ flex: 1, padding: "0.75rem 1rem", background: "transparent", border: "1px solid rgba(244,241,234,0.2)", borderRight: "none", color: "var(--bone)", fontSize: "0.875rem", fontFamily: "var(--U)", borderRadius: "2px 0 0 2px", outline: "none" }} />
              <button type="submit" style={{ padding: "0.75rem 1.5rem", background: "var(--mustard)", color: "var(--charcoal)", border: "1px solid var(--mustard)", fontFamily: "var(--U)", fontSize: "0.875rem", fontWeight: 600, cursor: "pointer", borderRadius: "0 2px 2px 0" }}>
                <ArrowRight size={16} />
              </button>
            </form>
          )}
          <p style={{ marginTop: "0.75rem", fontSize: "0.75rem", color: "var(--bone)", opacity: 0.35 }}>One essay a week. No spam. Unsubscribe anytime.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
