import { Link } from "wouter";
import { useState } from "react";
import { Star, ArrowRight } from "lucide-react";
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
  })?.slice(0, 12) || [];

  const PATH_CARDS = [
    { title: "Your Marriage", description: "Covenant, conflict, and the costly love that holds. For couples who need more than tips.", href: "/marriage", color: "var(--gold)" },
    { title: "Your Family", description: "Parenting is theology in practice. Raising kids who think, question, and believe.", href: "/parenting", color: "var(--ink)" },
    { title: "Your Faith", description: "For the honest, the questioning, and those who refuse to pretend. Theology for doubt.", href: "/doubt", color: "#333333" },
    { title: "Your Calling", description: "If you're a pastor, you don't have to lead alone. Resources, community, and honest help.", href: "/pastors", color: "var(--gold)" },
  ];

  const TESTIMONIALS = [
    { quote: "I was six months from walking away from ministry entirely. James's writing named what I was experiencing better than any counsellor had.", name: "Pastor M.T.", role: "Lead Pastor, Midwest", rating: 5 },
    { quote: "My husband and I were living like roommates. The article on emotional labor was the first time either of us could name what was happening. We talked for three hours.", name: "S.L.", role: "Married 11 years, Pacific Northwest", rating: 5 },
    { quote: "I found LiveWell during a crisis of faith. The theological depth gave me somewhere to stand. I'm still wrestling — but toward something now, not away from it.", name: "R.H.", role: "Seminary graduate, Texas", rating: 5 },
    { quote: "We were weeks from separating. A friend forwarded an article. We still needed counselling, but this was the first thing that made us both feel understood rather than accused.", name: "Anonymous couple", role: "Submitted via email", rating: 5 },
  ];

  const TOPICS = [
    { name: "Marriage", slug: "marriage", color: "var(--gold)", count: "50+", description: "Covenant, conflict, intimacy, and the long haul." },
    { name: "Parenting", slug: "parenting", color: "var(--ink)", count: "40+", description: "Faith formation, discipline, and loving your children well." },
    { name: "Theology", slug: "theology", color: "#333333", count: "80+", description: "Greek, Hebrew, church history, and hard questions." },
    { name: "Justice", slug: "justice", color: "var(--gold)", count: "65+", description: "Where the church has been silent when it should have spoken." },
    { name: "Pastoral Ministry", slug: "pastoral-ministry", color: "var(--ink)", count: "90+", description: "Burnout, preaching, conflict, and the soul beneath the calling." },
    { name: "Finances", slug: "finances", color: "#333333", count: "30+", description: "Biblical stewardship and the theology beneath every financial decision." },
    { name: "Devotionals", slug: "devotionals", color: "var(--gold)", count: "Daily", description: "Short, substantive readings rooted in Scripture." },
  ];

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) return;
    setEmailSubmitted(true);
    setEmailInput('');
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "James Bell",
    "url": "https://livewellbyjamesbell.co",
    "jobTitle": "Lead Pastor, Author",
    "description": "Lead Teaching Pastor at First Baptist Church of Fenton, founder of the Pastors Connection Network, and author of 25 books on theology, pastoral ministry, marriage, and Christian living.",
    "sameAs": ["https://pastorsconnectionnetwork.com", "https://substack.com/@jamesbell333289"]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "LiveWell by James Bell",
    "url": "https://livewellbyjamesbell.co",
    "description": "Theology that carries the weight of everyday life. 880+ essays on marriage, parenting, faith, justice, and pastoral ministry.",
    "potentialAction": { "@type": "SearchAction", "target": "https://livewellbyjamesbell.co/writing?q={search_term_string}", "query-input": "required name=search_term_string" }
  };

  return (
    <div style={{ background: "var(--paper2)" }}>
      <SEOMeta
        title="LiveWell by James Bell — Theology for Marriage, Family, Faith & Pastoral Ministry"
        description="Theology that carries the weight of everyday life. 880+ essays on marriage, parenting, faith crisis, justice, and pastoral ministry. By James Bell, author of 25 books."
        keywords="Christian marriage help, Christian parenting, faith crisis, pastor resources, theology, James Bell, biblical marriage, doubting God, pastoral burnout"
        url="https://livewellbyjamesbell.co"
        type="website"
        structuredData={websiteSchema}
      />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

      <MinimalNav />

      {/* HERO SECTION */}
      <section style={{ background: "var(--paper)", padding: "96px 20px 80px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--goldlt)", fontFamily: "var(--U)", marginBottom: "24px" }}>
            LIVE WELL BY JAMES BELL
          </div>
          <h1 style={{ fontSize: "clamp(40px, 6vw, 64px)", fontWeight: 300, lineHeight: 1.08, letterSpacing: "-0.025em", color: "var(--ink)", fontFamily: "var(--F)", marginBottom: "24px" }}>
            Theology That Carries the Weight of <em style={{ fontWeight: 600, fontStyle: "italic" }}>Everyday Life</em>
          </h1>
          <div style={{ width: "48px", height: "2px", background: "var(--gold)", marginBottom: "24px" }} />
          <p style={{ fontSize: "18px", lineHeight: 1.75, color: "var(--ink3)", maxWidth: "600px", marginBottom: "40px", fontFamily: "var(--F)" }}>
            Your marriage is under pressure. Your kids are watching. Your faith has questions it didn't used to have. You need theology that holds — not platitudes that crumble.
          </p>
          <div style={{ display: "flex", gap: "16px", marginBottom: "48px", flexWrap: "wrap" }}>
            <Link href="/start" style={{ textDecoration: "none" }}>
              <button style={{ background: "var(--gold)", color: "var(--ink)", border: "none", padding: "14px 28px", fontSize: "13px", fontWeight: 600, fontFamily: "var(--U)", letterSpacing: "0.04em", borderRadius: "6px", cursor: "pointer", transition: "all 0.2s" }}>
                Find Your Path
              </button>
            </Link>
            <Link href="/writing" style={{ textDecoration: "none" }}>
              <button style={{ background: "transparent", color: "var(--ink)", border: "1px solid var(--line)", padding: "14px 28px", fontSize: "13px", fontWeight: 600, fontFamily: "var(--U)", letterSpacing: "0.04em", borderRadius: "6px", cursor: "pointer", transition: "all 0.2s" }}>
                Browse All Essays
              </button>
            </Link>
          </div>
          <div style={{ display: "flex", gap: "40px", borderTop: "1px solid var(--line)", paddingTop: "24px", flexWrap: "wrap" }}>
            <div><div style={{ fontSize: "28px", fontWeight: 600, color: "var(--ink)", fontFamily: "var(--F)" }}>880+</div><div style={{ fontSize: "11px", color: "var(--ink3)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--U)" }}>Essays</div></div>
            <div><div style={{ fontSize: "28px", fontWeight: 600, color: "var(--ink)", fontFamily: "var(--F)" }}>25</div><div style={{ fontSize: "11px", color: "var(--ink3)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--U)" }}>Books</div></div>
            <div><div style={{ fontSize: "28px", fontWeight: 600, color: "var(--ink)", fontFamily: "var(--F)" }}>Free</div><div style={{ fontSize: "11px", color: "var(--ink3)", letterSpacing: "0.1em", textTransform: "uppercase", fontFamily: "var(--U)" }}>to Start</div></div>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: "20px", minWidth: "260px" }}>
          <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_4533_137f3486.jpeg" alt="James Bell, Lead Pastor and Author" loading="lazy" width="400" height="533" style={{ borderRadius: "8px", width: "100%", maxWidth: "400px", objectFit: "cover", objectPosition: "center top", aspectRatio: "3/4" }} />
        </div>
      </section>

      {/* PATH CARDS - "Where do you need to go?" */}
      <section style={{ background: "var(--paper2)", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", textAlign: "center", marginBottom: "12px", fontFamily: "Georgia, serif", color: "var(--ink)" }}>Where do you need to go?</h2>
          <p style={{ fontSize: "16px", textAlign: "center", color: "var(--ink3)", marginBottom: "48px" }}>Choose your path. Every road leads to theology that holds weight.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
            {PATH_CARDS.map((card, i) => (
              <Link key={i} href={card.href} style={{ textDecoration: "none" }}>
                <div style={{
                  background: "#FFF", padding: "32px", borderRadius: "12px", border: "1px solid #e5e5e5",
                  borderTop: `4px solid ${card.color}`, cursor: "pointer", height: "100%",
                  display: "flex", flexDirection: "column", transition: "box-shadow 0.2s",
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
                >
                  <div style={{ width: "40px", height: "3px", background: card.color, marginBottom: "16px" }} />
                  <h3 style={{ fontSize: "20px", fontWeight: "bold", marginBottom: "10px", color: "var(--ink)", fontFamily: "Georgia, serif" }}>{card.title}</h3>
                  <p style={{ fontSize: "14px", lineHeight: "1.7", color: "var(--ink3)", flex: 1 }}>{card.description}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", marginTop: "16px", color: card.color, fontWeight: "600", fontSize: "14px" }}>
                    Explore <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* "START HERE" QUIZ CTA */}
      <section style={{ background: "var(--ink)", color: "#ffffff", padding: "60px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div style={{ fontSize: "12px", fontWeight: "bold", letterSpacing: "2px", color: "var(--gold)", marginBottom: "12px" }}>NOT SURE WHERE TO START?</div>
          <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px", fontFamily: "Georgia, serif" }}>Take the 2-Minute Path Quiz</h2>
          <p style={{ fontSize: "16px", color: "var(--ink3)", marginBottom: "32px", lineHeight: "1.7" }}>Answer three questions. Get a personalized reading path based on where you are and what you're carrying.</p>
          <Link href="/start" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--gold)", color: "var(--ink)", border: "none", padding: "16px 40px", fontSize: "16px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer" }}>
              Find My Path
            </button>
          </Link>
        </div>
      </section>

      {/* EXPLORE BY TOPIC */}
      <section style={{ background: "var(--paper2)", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "16px", fontFamily: "Georgia, serif", color: "var(--ink)" }}>Explore by Topic</h2>
          <p style={{ fontSize: "16px", color: "var(--ink3)", marginBottom: "48px" }}>880+ essays organized across seven areas of faith and life.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {TOPICS.map((cat, i) => (
              <Link key={i} href={cat.slug === "marriage" ? "/marriage" : cat.slug === "parenting" ? "/parenting" : "/writing?topic=" + cat.slug} style={{ textDecoration: "none" }}>
                <div style={{ background: "#FFF", borderRadius: "8px", overflow: "hidden", border: "1px solid #e5e5e5", borderLeft: "6px solid " + cat.color, padding: "24px", cursor: "pointer", height: "100%" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "8px", color: "var(--ink)" }}>{cat.name}</h3>
                  <p style={{ fontSize: "13px", lineHeight: "1.6", color: "var(--ink3)", marginBottom: "12px" }}>{cat.description}</p>
                  <div style={{ fontSize: "12px", fontWeight: "bold", color: cat.color }}>{cat.count} articles</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED ESSAYS */}
      <section style={{ background: "var(--paper2)", color: "var(--ink)", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "40px", fontFamily: "Georgia, serif", color: "var(--ink)" }}>Featured Essays</h2>
          <div style={{ display: "flex", gap: "24px", marginBottom: "40px", borderBottom: "1px solid #e5e5e5", paddingBottom: "16px", overflowX: "auto" }}>
            {['All', 'Marriage', 'Parenting', 'Theology', 'Justice', 'Pastoral'].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab.toLowerCase())} style={{ padding: "8px 0", background: "none", border: "none", borderBottom: activeTab === tab.toLowerCase() ? "3px solid #D4A017" : "none", color: activeTab === tab.toLowerCase() ? "var(--gold)" : "var(--ink)", fontWeight: activeTab === tab.toLowerCase() ? "bold" : "normal", fontSize: "14px", cursor: "pointer", whiteSpace: "nowrap" }}>{tab}</button>
            ))}
          </div>
          {filteredArticles.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "var(--ink3)" }}>
              <p style={{ fontSize: "18px", marginBottom: "16px" }}>Essays loading...</p>
              <Link href="/writing" style={{ textDecoration: "none", color: "var(--gold)", fontWeight: "bold" }}>Browse all essays</Link>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" }}>
              {filteredArticles.map((article: any, i: number) => (
                <Link key={i} href={"/writing/" + article.slug} style={{ textDecoration: "none" }}>
                  <div style={{ background: "#FFF", padding: "24px", borderRadius: "8px", border: "1px solid #e5e5e5", cursor: "pointer", height: "100%", display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: "11px", fontWeight: "bold", color: "var(--gold)", marginBottom: "8px", textTransform: "uppercase" }}>{article.topic || 'ESSAY'}</div>
                    <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "8px", color: "var(--ink)", flex: 1, lineHeight: "1.4" }}>{article.title}</h3>
                    <div style={{ fontSize: "12px", color: "var(--ink3)" }}>{article.readTime || "5 min read"}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <Link href="/writing" style={{ textDecoration: "none" }}>
              <button style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 32px", background: "var(--ink)", color: "#ffffff", border: "none", borderRadius: "4px", fontWeight: "bold", fontSize: "14px", cursor: "pointer" }}>Browse All 880+ Essays</button>
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: "var(--ink)", color: "#ffffff", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "12px", textAlign: "center", fontFamily: "Georgia, serif" }}>What readers are saying</h2>
          <p style={{ fontSize: "16px", textAlign: "center", color: "var(--ink3)", marginBottom: "60px" }}>From pastors in crisis to couples on the edge to seekers with hard questions.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px" }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.05)", padding: "28px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
                  {[...Array(t.rating)].map((_, j) => (<Star key={j} size={14} fill="var(--gold)" color="var(--gold)" />))}
                </div>
                <p style={{ fontSize: "14px", lineHeight: "1.8", marginBottom: "16px", fontStyle: "italic" }}>"{t.quote}"</p>
                <div style={{ fontSize: "12px" }}>
                  <div style={{ fontWeight: "bold" }}>{t.name}</div>
                  <div style={{ color: "var(--ink3)" }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER SIGNUP */}
      <section style={{ background: "var(--ink)", color: "#ffffff", padding: "80px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <div style={{ fontSize: "12px", fontWeight: "bold", letterSpacing: "2px", color: "var(--gold)", marginBottom: "12px" }}>WEEKLY NEWSLETTER</div>
          <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px", fontFamily: "Georgia, serif" }}>Theology for your week</h2>
          <p style={{ fontSize: "15px", color: "var(--ink3)", marginBottom: "32px", lineHeight: "1.7" }}>One essay a week. Marriage, parenting, faith, justice — whatever you're carrying. Free. No spam. Unsubscribe anytime.</p>
          {emailSubmitted ? (
            <p style={{ color: "var(--gold)", fontWeight: "bold", fontSize: "18px" }}>You're in. Check your inbox.</p>
          ) : (
            <form onSubmit={handleEmailSubmit} style={{ display: "flex", gap: "12px", maxWidth: "480px", margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
              <input type="email" placeholder="your@email.com" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} required style={{ flex: 1, minWidth: "200px", padding: "14px 16px", border: "none", borderRadius: "4px", fontSize: "15px" }} />
              <button type="submit" style={{ background: "var(--gold)", color: "var(--ink)", border: "none", padding: "14px 28px", fontSize: "15px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer", whiteSpace: "nowrap" }}>Subscribe Free</button>
            </form>
          )}
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section style={{ background: "var(--paper2)", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", gap: "60px", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: "0 0 auto" }}>
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_4533_137f3486.jpeg" alt="James Bell" loading="lazy" width="320" height="320" style={{ borderRadius: "8px", width: "100%", maxWidth: "320px", objectFit: "cover", aspectRatio: "1" }} />
          </div>
          <div style={{ flex: 1, minWidth: "280px" }}>
            <div style={{ fontSize: "12px", fontWeight: "bold", letterSpacing: "2px", color: "var(--gold)", marginBottom: "12px" }}>ABOUT JAMES BELL</div>
            <p style={{ fontSize: "22px", fontStyle: "italic", lineHeight: "1.6", marginBottom: "24px", color: "var(--ink)", fontFamily: "Georgia, serif" }}>"I write for people who take faith seriously enough to let it cost them something."</p>
            <p style={{ fontSize: "14px", lineHeight: "1.8", marginBottom: "24px", color: "var(--ink3)" }}>Lead Teaching Pastor at First Baptist Church of Fenton. Founder of the Pastors Connection Network. Author of 25 books. Father of five. Writing from the room where people fall apart and the room where they find their footing.</p>
            <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", marginBottom: "24px" }}>
              {["Lead Pastor", "Author of 25 Books", "PCN Founder", "Father of Five"].map((badge, i) => (
                <div key={i} style={{ background: "var(--ink)", color: "#ffffff", padding: "6px 14px", borderRadius: "4px", fontSize: "12px", fontWeight: "600" }}>{badge}</div>
              ))}
            </div>
            <Link href="/about" style={{ textDecoration: "none" }}>
              <button style={{ background: "var(--gold)", color: "var(--ink)", border: "none", padding: "12px 24px", fontSize: "14px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer" }}>Full Story</button>
            </Link>
          </div>
        </div>
      </section>

      {/* FOR PASTORS CTA */}
      <section style={{ background: "var(--ink)", color: "#ffffff", padding: "60px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <div style={{ fontSize: "12px", fontWeight: "bold", letterSpacing: "2px", color: "var(--gold)", marginBottom: "12px" }}>PASTORS CONNECTION NETWORK</div>
          <h2 style={{ fontSize: "28px", fontWeight: "bold", marginBottom: "16px", fontFamily: "Georgia, serif" }}>If you're a pastor, we built something for you.</h2>
          <p style={{ fontSize: "15px", color: "var(--ink3)", marginBottom: "32px", lineHeight: "1.7" }}>43% of pastors report loneliness and isolation. You don't have to lead alone. Sermon resources, pastoral health articles, coaching, and a community of pastors who get it.</p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/pastors" style={{ textDecoration: "none" }}>
              <button style={{ background: "var(--gold)", color: "var(--ink)", border: "none", padding: "14px 28px", fontSize: "15px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer" }}>Explore Pastor Resources</button>
            </Link>
            <a href="https://pastorsconnectionnetwork.com" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <button style={{ background: "transparent", color: "var(--ink)", border: "1px solid #e5e5e5", padding: "14px 28px", fontSize: "15px", borderRadius: "4px", cursor: "pointer" }}>Visit PCN</button>
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
