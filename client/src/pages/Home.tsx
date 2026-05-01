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
  const [activeTab, setActiveTab] = useState("all");
  const { data: articles } = trpc.posts.listPublished.useQuery();

  const filteredArticles = articles?.filter((a: any) => {
    if (activeTab === "all") return true;
    const pillar = (a.pillar || "").toLowerCase();
    const topic = (a.topic || "").toLowerCase();
    if (activeTab === "marriage") return pillar.includes("life") || topic.includes("marriage") || topic.includes("family");
    if (activeTab === "parenting") return topic.includes("parent") || topic.includes("family");
    if (activeTab === "theology") return pillar.includes("theolog") || topic.includes("theolog");
    if (activeTab === "justice") return pillar.includes("justice") || topic.includes("justice");
    if (activeTab === "pastoral") return pillar.includes("leadership") || topic.includes("pastor") || topic.includes("leadership");
    return true;
  })?.slice(0, 9) || [];

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
    sameAs: ["https://pastorsconnectionnetwork.com", "https://substack.com/@jamesbell333289", "https://www.facebook.com/james.bell.609252"],
  };
  const websiteSchema = {
    "@context": "https://schema.org", "@type": "WebSite",
    name: "LiveWell by James Bell", url: "https://livewellbyjamesbell.co",
    description: "Theology that carries the weight of everyday life. 880+ essays on marriage, parenting, faith, justice, and pastoral ministry.",
    potentialAction: { "@type": "SearchAction", target: "https://livewellbyjamesbell.co/writing?q={search_term_string}", "query-input": "required name=search_term_string" },
  };

  return (
    <div style={{ background: "var(--paper)" }}>
      <SEOMeta
        title="LiveWell by James Bell — Theology for Marriage, Family, Faith & Pastoral Ministry"
        description="Theology that carries the weight of everyday life. 880+ essays on marriage, parenting, faith crisis, justice, and pastoral ministry. By James Bell, author of 25 books."
        url="https://livewellbyjamesbell.co"
        type="website"
        structuredData={websiteSchema}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      <MinimalNav />

      {/* ───── HERO: Problem + Agitation ───── */}
      <section style={{ padding: "96px 20px 80px" }}>
        <div style={{ maxWidth: "780px", margin: "0 auto" }}>
          <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--goldlt)", fontFamily: "var(--U)", marginBottom: "28px" }}>
            LIVE WELL BY JAMES BELL
          </div>
          <h1 style={{ fontSize: "clamp(36px, 5.5vw, 60px)", fontWeight: 300, lineHeight: 1.08, letterSpacing: "-0.025em", color: "var(--ink)", fontFamily: "var(--F)", marginBottom: "28px" }}>
            Your faith deserves more than platitudes. Your marriage deserves more than tips. <em style={{ fontWeight: 600, fontStyle: "italic" }}>Start here.</em>
          </h1>
          <div style={{ width: "48px", height: "2px", background: "var(--gold)", marginBottom: "28px" }} />
          <p style={{ fontSize: "18px", lineHeight: 1.75, color: "var(--ink3)", maxWidth: "580px", marginBottom: "40px", fontFamily: "var(--F)" }}>
            880+ essays on the things that actually keep you up at night — marriage under pressure, kids who are watching, faith that has more questions than it used to, and a calling that costs more than anyone told you it would.
          </p>
          <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
            <Link href="/writing" style={{ textDecoration: "none" }}>
              <button style={{ background: "var(--gold)", color: "var(--ink)", border: "none", padding: "14px 28px", fontSize: "13px", fontWeight: 600, fontFamily: "var(--U)", letterSpacing: "0.04em", borderRadius: "6px", cursor: "pointer" }}>
                Start Reading
              </button>
            </Link>
            <Link href="/start" style={{ textDecoration: "none" }}>
              <button style={{ background: "transparent", color: "var(--ink)", border: "1px solid var(--line)", padding: "14px 28px", fontSize: "13px", fontWeight: 600, fontFamily: "var(--U)", letterSpacing: "0.04em", borderRadius: "6px", cursor: "pointer" }}>
                Find Your Path
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ───── TRUST STRIP ───── */}
      <section style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)", padding: "32px 20px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", justifyContent: "center", gap: "48px", flexWrap: "wrap" }}>
          {[
            { n: "880+", l: "Essays" },
            { n: "25", l: "Books Published" },
            { n: "15+", l: "Years in Ministry" },
            { n: "Free", l: "to Start" },
          ].map((s, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{ fontSize: "28px", fontWeight: 600, color: "var(--ink)", fontFamily: "var(--F)", lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: "11px", color: "var(--ink3)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--U)", marginTop: "4px" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ───── HOW IT WORKS (3 steps) ───── */}
      <section style={{ padding: "80px 20px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--goldlt)", fontFamily: "var(--U)", marginBottom: "16px" }}>HOW IT WORKS</div>
          <h2 style={{ fontSize: "32px", fontWeight: 600, color: "var(--ink)", fontFamily: "var(--F)", marginBottom: "48px", lineHeight: 1.15 }}>Three ways in. No prerequisites.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "32px" }}>
            {[
              { step: "01", title: "Pick what you're carrying", desc: "Marriage. Parenting. Doubt. Pastoral burnout. Choose the topic that's weighing on you right now.", href: "/start" },
              { step: "02", title: "Read something that holds weight", desc: "Every essay is written by a working pastor with 15 years of ministry, five kids, and no patience for shallow theology.", href: "/writing" },
              { step: "03", title: "Use a tool that helps", desc: "Bible verse finder, prayer generator, theology quiz. Built for the moments when you need something practical, not another sermon.", href: "/tools" },
            ].map((item) => (
              <Link key={item.step} href={item.href} style={{ textDecoration: "none" }}>
                <div style={{ padding: "32px", background: "var(--card)", border: "1px solid var(--line)", borderRadius: "12px", height: "100%", transition: "box-shadow 0.2s, transform 0.2s", cursor: "pointer" }}
                  onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(26,26,26,0.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
                >
                  <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.15em", color: "var(--gold)", fontFamily: "var(--U)", marginBottom: "16px" }}>{item.step}</div>
                  <h3 style={{ fontSize: "20px", fontWeight: 600, color: "var(--ink)", fontFamily: "var(--F)", marginBottom: "12px", lineHeight: 1.3 }}>{item.title}</h3>
                  <p style={{ fontSize: "15px", lineHeight: 1.7, color: "var(--ink3)", fontFamily: "var(--B)" }}>{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ───── FEATURED ESSAYS ───── */}
      <section style={{ padding: "80px 20px", background: "var(--paper2)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--goldlt)", fontFamily: "var(--U)", marginBottom: "16px" }}>FEATURED WRITING</div>
          <h2 style={{ fontSize: "32px", fontWeight: 600, color: "var(--ink)", fontFamily: "var(--F)", marginBottom: "32px", lineHeight: 1.15 }}>Recent essays</h2>
          <div style={{ display: "flex", gap: "16px", marginBottom: "32px", borderBottom: "1px solid var(--line)", paddingBottom: "12px", overflowX: "auto" }}>
            {["All", "Marriage", "Parenting", "Theology", "Justice", "Pastoral"].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab.toLowerCase())} style={{
                padding: "6px 0", background: "none", border: "none", fontSize: "13px", fontFamily: "var(--U)", fontWeight: 500, cursor: "pointer", whiteSpace: "nowrap",
                color: activeTab === tab.toLowerCase() ? "var(--ink)" : "var(--ink3)",
                borderBottom: activeTab === tab.toLowerCase() ? "2px solid var(--gold)" : "2px solid transparent",
                paddingBottom: activeTab === tab.toLowerCase() ? "10px" : "12px",
              }}>{tab}</button>
            ))}
          </div>
          {filteredArticles.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 0", color: "var(--ink3)" }}>
              <p style={{ marginBottom: "12px" }}>Loading essays...</p>
              <Link href="/writing" style={{ color: "var(--gold)", fontWeight: 600 }}>Browse all essays</Link>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "24px" }}>
              {filteredArticles.map((article: any, i: number) => (
                <Link key={i} href={"/writing/" + article.slug} style={{ textDecoration: "none" }}>
                  <div style={{ background: "var(--card)", padding: "28px", borderRadius: "12px", border: "1px solid var(--line)", cursor: "pointer", height: "100%", display: "flex", flexDirection: "column", transition: "box-shadow 0.2s, transform 0.2s" }}
                    onMouseEnter={(e) => { e.currentTarget.style.boxShadow = "0 8px 24px rgba(26,26,26,0.08)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}
                  >
                    <div style={{ fontSize: "11px", fontWeight: 600, color: "var(--goldlt)", marginBottom: "10px", textTransform: "uppercase", letterSpacing: "0.1em", fontFamily: "var(--U)" }}>{article.topic || article.pillar || "Essay"}</div>
                    <h3 style={{ fontSize: "18px", fontWeight: 600, marginBottom: "10px", color: "var(--ink)", flex: 1, lineHeight: 1.35, fontFamily: "var(--F)" }}>{article.title}</h3>
                    <div style={{ fontSize: "12px", color: "var(--ink3)", fontFamily: "var(--U)" }}>{article.readTime || "5 min read"}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link href="/writing" style={{ textDecoration: "none" }}>
              <button style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "13px 28px", background: "var(--ink)", color: "var(--paper)", border: "none", borderRadius: "6px", fontWeight: 600, fontSize: "13px", fontFamily: "var(--U)", letterSpacing: "0.04em", cursor: "pointer" }}>
                Browse All Essays <ArrowRight size={14} />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ───── TESTIMONIALS ───── */}
      <section style={{ padding: "80px 20px", background: "var(--ink)" }}>
        <div style={{ maxWidth: "1000px", margin: "0 auto" }}>
          <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", fontFamily: "var(--U)", marginBottom: "16px", textAlign: "center" }}>WHAT READERS SAY</div>
          <h2 style={{ fontSize: "32px", fontWeight: 600, color: "var(--paper)", fontFamily: "var(--F)", marginBottom: "48px", textAlign: "center", lineHeight: 1.15 }}>From pastors in crisis to couples on the edge</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {[
              { quote: "I was six months from walking away from ministry entirely. James's writing named what I was experiencing better than any counselor had.", name: "Pastor M.T.", role: "Lead Pastor, Midwest" },
              { quote: "My husband and I were living like roommates. The article on emotional labor was the first time either of us could name what was happening. We talked for three hours.", name: "S.L.", role: "Married 11 years" },
              { quote: "I found LiveWell during a crisis of faith. The theological depth gave me somewhere to stand. I'm still wrestling — but toward something now, not away from it.", name: "R.H.", role: "Seminary graduate, Texas" },
            ].map((t, i) => (
              <div key={i} style={{ padding: "28px", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)" }}>
                <div style={{ width: "32px", height: "2px", background: "var(--gold)", marginBottom: "20px" }} />
                <p style={{ fontSize: "15px", lineHeight: 1.75, color: "rgba(255,255,255,0.85)", marginBottom: "20px", fontFamily: "var(--F)", fontStyle: "italic" }}>"{t.quote}"</p>
                <div style={{ fontSize: "13px", fontWeight: 600, color: "var(--paper)", fontFamily: "var(--U)" }}>{t.name}</div>
                <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)", fontFamily: "var(--U)" }}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── NEWSLETTER CTA ───── */}
      <section style={{ padding: "80px 20px" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--goldlt)", fontFamily: "var(--U)", marginBottom: "16px" }}>WEEKLY LETTER</div>
          <h2 style={{ fontSize: "32px", fontWeight: 600, color: "var(--ink)", fontFamily: "var(--F)", marginBottom: "16px", lineHeight: 1.15 }}>One essay a week. For what you're carrying.</h2>
          <p style={{ fontSize: "16px", color: "var(--ink3)", marginBottom: "32px", lineHeight: 1.7, fontFamily: "var(--B)" }}>Marriage, parenting, faith, justice, pastoral ministry. No spam. Unsubscribe anytime.</p>
          {emailSubmitted ? (
            <p style={{ color: "var(--gold)", fontWeight: 600, fontSize: "16px", fontFamily: "var(--F)" }}>Welcome. Check your inbox.</p>
          ) : (
            <form onSubmit={handleEmailSubmit} style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
              <input type="email" placeholder="your@email.com" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} required
                style={{ flex: 1, minWidth: "200px", maxWidth: "300px", padding: "13px 16px", border: "1px solid var(--line)", borderRadius: "6px", fontSize: "14px", fontFamily: "var(--U)", background: "var(--card)" }}
              />
              <button type="submit" style={{ background: "var(--gold)", color: "var(--ink)", border: "none", padding: "13px 24px", fontSize: "13px", fontWeight: 600, fontFamily: "var(--U)", letterSpacing: "0.04em", borderRadius: "6px", cursor: "pointer", whiteSpace: "nowrap" }}>
                Get the Letter
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ───── ABOUT STRIP ───── */}
      <section style={{ padding: "80px 20px", background: "var(--paper2)", borderTop: "1px solid var(--line)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "flex", gap: "48px", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: "0 0 auto" }}>
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_4533_137f3486.jpeg" alt="James Bell, Lead Pastor and Author" loading="lazy" style={{ borderRadius: "12px", width: "200px", height: "260px", objectFit: "cover", objectPosition: "center top", border: "1px solid var(--line)" }} />
          </div>
          <div style={{ flex: 1, minWidth: "280px" }}>
            <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--goldlt)", fontFamily: "var(--U)", marginBottom: "12px" }}>ABOUT THE AUTHOR</div>
            <p style={{ fontSize: "20px", lineHeight: 1.55, marginBottom: "16px", color: "var(--ink)", fontFamily: "var(--F)", fontStyle: "italic" }}>"I write for people who take faith seriously enough to let it cost them something."</p>
            <p style={{ fontSize: "15px", lineHeight: 1.75, marginBottom: "24px", color: "var(--ink3)" }}>Lead Teaching Pastor. Founder of the Pastors Connection Network. Author of 25 books. Father of five. Writing from where people fall apart and where they find their footing.</p>
            <Link href="/about" style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "6px", fontSize: "13px", fontWeight: 600, color: "var(--ink)", fontFamily: "var(--U)" }}>
              Read the full story <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
