import { Link } from "wouter";
import { useState } from "react";
import { Star, ChevronRight } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { SEOMeta } from "@/components/SEOMeta";
import Footer from "@/components/Footer";

const CATEGORIES = [
  { name: "Theological Depth", color: "#2D4A3E", link: "/writing?topic=theology", description: "Greek, Hebrew, church history, and the hard questions.", count: "80+" },
  { name: "Justice", color: "#8B4545", link: "/writing?topic=justice", description: "The places where the church has been silent.", count: "65+" },
  { name: "Pastoral Ministry", color: "#6B8E6F", link: "/writing?topic=pastoral-ministry", description: "The hidden weight of leading God's people.", count: "90+" },
  { name: "Marriage", color: "#B8963E", link: "/writing?topic=marriage", description: "Covenant, conflict, intimacy, and the long haul.", count: "50+" },
  { name: "Parenting", color: "#9B8BA8", link: "/writing?topic=parenting", description: "Faith formation and loving your children well.", count: "40+" },
  { name: "Finances", color: "#6B9B8B", link: "/writing?topic=finances", description: "Biblical stewardship and financial theology.", count: "30+" },
  { name: "Devotionals", color: "#8B9B6F", link: "/writing?topic=devotionals", description: "Short, substantive daily readings.", count: "Daily" },
];

const AUDIENCES = [
  { name: "Pastors", description: "Burnout, preaching, staff culture, and the soul beneath the calling.", link: "/for-pastors" },
  { name: "Leaders", description: "Vision, character formation, and the interior work.", link: "/for-leaders" },
  { name: "Families", description: "Marriage, parenting, and finances — theology at the kitchen table.", link: "/writing?audience=families" },
  { name: "Seekers", description: "For those with questions and doubts.", link: "/writing?audience=seekers" },
  { name: "Small Groups", description: "Discussion guides and reading paths to go deeper.", link: "/reading-paths" },
];

const TESTIMONIALS = [
  { quote: "I was six months from walking away from ministry. The essay on being tired gave me language I could not articulate. I am still in the pulpit.", name: "Pastor M.T.", role: "Lead Pastor, Midwest", rating: 5 },
  { quote: "James writes with theological weight and pastoral honesty. I send his articles to my staff team.", name: "Rev. D.K.", role: "Senior Pastor, Southeast US", rating: 5 },
  { quote: "The article on emotional labor was the first time either of us could name what was happening. We are in a completely different place now.", name: "S.L.", role: "Married 11 years, Pacific Northwest", rating: 5 },
  { quote: "We were weeks away from separating. This made us both feel understood rather than accused.", name: "Anonymous couple", role: "Submitted via email", rating: 5 },
  { quote: "James writes about justice the way it should be written. No sloganeering. Just careful thinking.", name: "Pastor J.W.", role: "Church planter, Urban Northeast", rating: 5 },
  { quote: "LiveWell gave me somewhere to stand during a crisis of faith. I am wrestling toward something now.", name: "R.H.", role: "Seminary graduate, Texas", rating: 5 },
];

const FEATURED_TITLES = [
  "The Difference Between Being Tired and Being Done",
  "What Pastors Fear Most (That They Never Say Out Loud)",
  "The Slow Drift That Ends More Marriages Than Dramatic Betrayal Does",
  "When the Church Married Empire",
  "Sabbath as Resistance: Why Resting Is a Radical Act",
  "The Resentment in Your Marriage Is Telling You Something Worth Hearing",
  "How to Pastor a Congregation That Is Politically Divided",
  "When Fear Rewrites Theology",
  "Protecting Your Marriage When Ministry Demands Everything",
  "Why Pastors Quit (And How to Stay)",
  "The Hidden Pain of the Successful Pastor",
  "Your Church Needs You Healthy More Than It Needs You Busy",
];

const TOPIC_COLOR: Record<string, string> = {
  "pastoral-ministry": "#6B8E6F", "marriage": "#B8963E", "justice": "#8B4545",
  "theology": "#2D4A3E", "finances": "#6B9B8B", "parenting": "#9B8BA8", "devotionals": "#8B9B6F",
};

export default function Home() {
  const [activeTab, setActiveTab] = useState("all");
  const [emailInput, setEmailInput] = useState("");
  const [devotionalEmail, setDevotionalEmail] = useState("");
  const [emailStatus, setEmailStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [devStatus, setDevStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const { data: articles } = trpc.posts.listPublished.useQuery();
  const TAB_TOPIC_MAP: Record<string, string> = { pastoral: "pastoral-ministry", marriage: "marriage", justice: "justice", theology: "theology", finances: "finances" };
  const filteredArticles = (articles || []).filter((a: any) => FEATURED_TITLES.includes(a.title));
  const displayedArticles = filteredArticles.filter((article: any) => activeTab === "all" ? true : article.topic?.toLowerCase() === TAB_TOPIC_MAP[activeTab]).slice(0, 12);
  const handleEmailSignup = (e: React.FormEvent) => { e.preventDefault(); setEmailStatus("loading"); fetch("/api/newsletter/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: emailInput, list: "pillars-guide" }) }).then(() => { setEmailStatus("success"); setEmailInput(""); }).catch(() => setEmailStatus("error")); };
  const handleDevotionalSignup = (e: React.FormEvent) => { e.preventDefault(); setDevStatus("loading"); fetch("/api/newsletter/subscribe", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: devotionalEmail, list: "daily-devotional" }) }).then(() => { setDevStatus("success"); setDevotionalEmail(""); }).catch(() => setDevStatus("error")); };

  return (
    <div style={{ background: "var(--paper)" }}>
      <SEOMeta title="LiveWell by James Bell — Theology That Actually Works" description="Essays, devotionals, and resources on faith, marriage, justice, parenting, finances, and pastoral ministry by James Bell, Lead Pastor and author of 25 books." keywords="theology, pastoral ministry, marriage, faith, Christian living, James Bell" url="https://livewellbyjamesbell.com/" type="website" />
      <section className="hero">
        <div className="hero__inner">
          <div>
            <div className="kicker"><div className="kicker-line"></div><div className="kicker-txt">Lead Pastor · Author · Founder, Pastors Connection Network</div></div>
            <h1 className="hero-h">Theology That <strong>Actually Works</strong> — For Pastors, Leaders, and Families Tired of Shallow Faith</h1>
            <p className="hero-sub">Essays, devotionals, and resources on faith, marriage, justice, parenting, finances, and pastoral ministry by James Bell, Lead Pastor and author of 25 books.</p>
            <div className="hero-ctas"><Link href="/writing" className="btn-gold">Browse 879+ Articles <ChevronRight size={16} /></Link><Link href="/pillars" className="btn-ghost">Explore the 5 Pillars</Link></div>
            <div className="hero-stats"><div><div className="hstat-n">879+</div><div className="hstat-l">Articles</div></div><div className="hstat-div"></div><div><div className="hstat-n">25</div><div className="hstat-l">Books</div></div><div className="hstat-div"></div><div><div className="hstat-n">4,200+</div><div className="hstat-l">Weekly Readers</div></div><div className="hstat-div"></div><div><div className="hstat-n">Free</div><div className="hstat-l">to Start</div></div></div>
          </div>
          <div className="hero-card">
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_4533_137f3486.jpeg" alt="James Bell Lead Pastor and Author" width="88" height="88" loading="eager" />
            <div className="hcard-name">James Bell</div><div className="hcard-role">Lead Pastor · Author · Pastor Trainer</div>
            <p className="hcard-bio">Lead Teaching Pastor at First Baptist Church of Fenton. Founder of the Pastors Connection Network. Author of 25 books.</p>
            <blockquote className="hcard-quote">"I write for people who take faith seriously enough to let it cost them something."<cite className="hcard-cite">— James Bell</cite></blockquote>
          </div>
        </div>
        <div className="hero-strip"><div className="hero-strip-inner"><div className="strip-label">Featured</div><div className="strip-scroll">{FEATURED_TITLES.slice(0, 6).map((title, i) => (<Link key={i} href="/writing" className="strip-item"><div><div className="sitem-cat">Essay</div><div className="sitem-title">{title}</div></div></Link>))}</div></div></div>
      </section>
      <section style={{ background: "#2D4A3E", color: "#F7F5F0", padding: "60px 0" }}>
        <div className="wrap" style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: "600", letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8963E", marginBottom: "12px" }}>Free Download</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(28px,4vw,40px)", fontWeight: "300", marginBottom: "16px", color: "#F7F5F0" }}>The Complete Guide to the 5 Pillars Framework</h2>
          <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.7)", maxWidth: "520px", margin: "0 auto 32px" }}>Understand the framework that organises all 879+ articles on LiveWell. Free PDF, straight to your inbox.</p>
          {emailStatus === "success" ? (<div style={{ background: "rgba(184,150,62,0.2)", border: "1px solid #B8963E", padding: "16px 32px", borderRadius: "4px", display: "inline-block", color: "#B8963E", fontWeight: "bold" }}>Check your inbox — the guide is on its way!</div>) : (<form onSubmit={handleEmailSignup} style={{ display: "flex", gap: "12px", maxWidth: "500px", margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}><input type="email" placeholder="your@email.com" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} required style={{ flex: 1, minWidth: "220px", padding: "13px 16px", border: "none", borderRadius: "2px", fontSize: "15px" }} /><button type="submit" disabled={emailStatus === "loading"} className="btn-gold">{emailStatus === "loading" ? "Sending" : "Send Me the Guide"}</button></form>)}
        </div>
      </section>
      <section style={{ background: "linear-gradient(135deg, #2D4A3E 0%, #1A2E22 100%)", padding: "80px 0" }}>
        <div className="wrap">
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px,4vw,48px)", fontWeight: "300", textAlign: "center", marginBottom: "60px", color: "#F7F5F0" }}>Who We Serve</h2>
          <div className="grid grid-3" style={{ gap: "24px" }}>{AUDIENCES.map((aud, i) => (<Link key={i} href={aud.link} style={{ textDecoration: "none" }}><div style={{ background: "rgba(255,255,255,0.07)", color: "#F7F5F0", padding: "32px", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", height: "100%" }}><h3 style={{ fontFamily: "var(--F)", fontSize: "22px", fontWeight: "600", marginBottom: "12px", color: "#F7F5F0" }}>{aud.name}</h3><p style={{ fontSize: "14px", lineHeight: "1.7", color: "rgba(255,255,255,0.7)", flex: 1, marginBottom: "16px" }}>{aud.description}</p><span style={{ color: "#B8963E", fontSize: "13px", fontWeight: "bold", fontFamily: "var(--U)" }}>Explore</span></div></Link>))}</div>
        </div>
      </section>
      <section style={{ background: "var(--cream)", padding: "80px 0" }}>
        <div className="wrap">
          <h2 className="section-title" style={{ marginBottom: "8px" }}>Explore by Topic</h2>
          <p className="section-sub">879+ essays across 7 areas of faithful living.</p>
          <div className="grid grid-4" style={{ gap: "20px" }}>{CATEGORIES.map((cat, i) => (<Link key={i} href={cat.link} style={{ textDecoration: "none" }}><div style={{ background: "#FFF", borderRadius: "4px", borderLeft: "6px solid " + cat.color, padding: "24px", cursor: "pointer", height: "100%" }}><h3 style={{ fontFamily: "var(--F)", fontSize: "16px", fontWeight: "600", marginBottom: "8px", color: "var(--ink)" }}>{cat.name}</h3><p style={{ fontSize: "13px", lineHeight: "1.6", color: "var(--ink3)", marginBottom: "12px" }}>{cat.description}</p><div style={{ fontSize: "12px", fontWeight: "bold", color: cat.color, fontFamily: "var(--U)" }}>{cat.count} articles</div></div></Link>))}</div>
        </div>
      </section>
      <section style={{ background: "var(--paper)", padding: "80px 0" }}>
        <div className="wrap">
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "40px", flexWrap: "wrap", gap: "16px" }}><h2 className="section-title" style={{ marginBottom: 0 }}>Featured Essays</h2><Link href="/writing" style={{ color: "var(--gold)", fontSize: "13px", fontWeight: "bold", fontFamily: "var(--U)" }}>Browse all 879+</Link></div>
          <div style={{ display: "flex", gap: "4px", marginBottom: "40px", borderBottom: "2px solid var(--border)", overflowX: "auto" }}>{["All", "Pastoral", "Marriage", "Justice", "Theology", "Finances"].map((tab) => (<button key={tab} onClick={() => setActiveTab(tab.toLowerCase())} style={{ padding: "10px 16px", background: "none", border: "none", borderBottom: activeTab === tab.toLowerCase() ? "3px solid var(--gold)" : "3px solid transparent", color: activeTab === tab.toLowerCase() ? "var(--gold)" : "var(--ink3)", fontWeight: activeTab === tab.toLowerCase() ? "700" : "400", fontSize: "12px", cursor: "pointer", fontFamily: "var(--U)", letterSpacing: "0.08em", whiteSpace: "nowrap", marginBottom: "-2px", textTransform: "uppercase" }}>{tab}</button>))}</div>
          {displayedArticles.length > 0 ? (<div className="grid grid-3">{displayedArticles.map((article: any, i: number) => (<Link key={i} href={"/writing/" + article.slug} style={{ textDecoration: "none" }}><div className="card" style={{ borderLeft: "4px solid " + (TOPIC_COLOR[article.topic] || "var(--gold)") }}><div className="card-body">{article.topic && <div className="card-cat">{article.topic.replace(/-/g, " ")}</div>}<h3 className="card-title">{article.title}</h3>{article.excerpt && <p className="card-desc">{article.excerpt.substring(0, 100)}</p>}<div className="card-meta"><span>{article.readingTimeMinutes || 5} min read</span></div></div></div></Link>))}</div>) : (<div style={{ textAlign: "center", padding: "60px 0" }}><p style={{ color: "var(--ink3)", marginBottom: "24px" }}>Loading featured essays</p><Link href="/writing" className="btn-gold">Browse All Articles</Link></div>)}
        </div>
      </section>
      <section style={{ background: "#2D4A3E", padding: "80px 0" }}>
        <div className="wrap">
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px,4vw,48px)", fontWeight: "300", marginBottom: "12px", textAlign: "center", color: "#F7F5F0" }}>What readers are saying</h2>
          <p style={{ fontSize: "16px", textAlign: "center", color: "rgba(255,255,255,0.6)", marginBottom: "60px", fontFamily: "var(--U)" }}>Pastors, leaders, couples, and seekers from across the community.</p>
          <div className="grid grid-3">{TESTIMONIALS.map((t, i) => (<div key={i} style={{ background: "rgba(255,255,255,0.05)", padding: "32px", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.1)" }}><div style={{ display: "flex", gap: "3px", marginBottom: "16px" }}>{[...Array(t.rating)].map((_, j) => <Star key={j} size={14} fill="#B8963E" color="#B8963E" />)}</div><p style={{ fontSize: "14px", lineHeight: "1.85", marginBottom: "20px", fontStyle: "italic", color: "rgba(255,255,255,0.85)" }}>"{t.quote}"</p><div style={{ fontWeight: "bold", fontSize: "12px", fontFamily: "var(--U)", color: "#F7F5F0" }}>{t.name}</div><div style={{ color: "rgba(255,255,255,0.5)", fontSize: "11px", fontFamily: "var(--U)" }}>{t.role}</div></div>))}</div>
        </div>
      </section>
      <section style={{ background: "#1A1A1A", padding: "80px 0" }}>
        <div className="wrap">
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: "48px" }}><h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px,4vw,48px)", fontWeight: "300", color: "#F7F5F0" }}>25 Books by James Bell</h2><Link href="/books" style={{ color: "#B8963E", fontSize: "13px", fontWeight: "bold", fontFamily: "var(--U)" }}>View All</Link></div>
          <div style={{ display: "flex", gap: "16px", overflowX: "auto", paddingBottom: "16px", marginBottom: "40px" }}>{["The Undershepherd", "Dangerous Calling", "The Hidden Life", "The First Flock", "Preach the Word", "The Unfinished Church", "The Trench Work", "Marriage in the Wilderness"].map((book, i) => (<Link key={i} href="/books" style={{ textDecoration: "none" }}><div style={{ minWidth: "140px", background: "#2D4A3E", padding: "24px 16px", borderRadius: "4px", textAlign: "center", fontSize: "13px", fontFamily: "var(--F)", fontWeight: "600", color: "#F7F5F0", lineHeight: "1.4" }}>{book}</div></Link>))}</div>
          <Link href="/books" className="btn-gold">View All 25 Books</Link>
        </div>
      </section>
      <section style={{ background: "#2D4A3E", padding: "80px 0" }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "60px", alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#B8963E", marginBottom: "16px", fontWeight: "600" }}>Daily Devotional</div>
            <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(28px,3vw,40px)", fontWeight: "300", marginBottom: "16px", color: "#F7F5F0" }}>Start every morning rooted.</h2>
            <p style={{ fontSize: "15px", lineHeight: "1.8", marginBottom: "28px", color: "rgba(255,255,255,0.7)" }}>A short, substantive daily devotional — Scripture, honest reflection, and a prayer. Free to your inbox every morning.</p>
            {devStatus === "success" ? (<div style={{ background: "rgba(184,150,62,0.2)", border: "1px solid #B8963E", padding: "14px 24px", borderRadius: "4px", display: "inline-block", color: "#B8963E", fontWeight: "bold" }}>Subscribed! First devotional arrives tomorrow.</div>) : (<form onSubmit={handleDevotionalSignup} style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}><input type="email" placeholder="your@email.com" value={devotionalEmail} onChange={(e) => setDevotionalEmail(e.target.value)} required style={{ flex: 1, minWidth: "200px", maxWidth: "300px", padding: "12px 16px", border: "none", borderRadius: "2px", fontSize: "14px" }} /><button type="submit" disabled={devStatus === "loading"} className="btn-gold">{devStatus === "loading" ? "Subscribing" : "Subscribe Free"}</button></form>)}
          </div>
          <div style={{ background: "rgba(255,255,255,0.05)", padding: "32px", borderRadius: "4px", border: "1px solid rgba(255,255,255,0.1)", borderLeft: "4px solid #B8963E" }}>
            <div style={{ fontFamily: "var(--U)", fontSize: "10px", color: "#B8963E", fontWeight: "bold", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "12px" }}>Today's Devotional</div>
            <h3 style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: "600", marginBottom: "12px", color: "#F7F5F0" }}>The Weight of Witness</h3>
            <p style={{ fontSize: "14px", lineHeight: "1.75", color: "rgba(255,255,255,0.7)", fontStyle: "italic" }}>"You will receive power when the Holy Spirit comes on you; and you will be my witnesses" Acts 1:8</p>
          </div>
        </div>
      </section>
      <section style={{ background: "var(--paper)", padding: "100px 0" }}>
        <div className="wrap" style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: "80px", alignItems: "center" }}>
          <div><img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_4533_137f3486.jpeg" alt="James Bell Lead Pastor Author and Founder" width="380" height="380" loading="lazy" style={{ borderRadius: "4px", width: "100%", objectFit: "cover", aspectRatio: "1", border: "1px solid var(--border)" }} /></div>
          <div>
            <div style={{ fontFamily: "var(--U)", fontSize: "11px", fontWeight: "600", letterSpacing: "0.2em", color: "var(--gold)", marginBottom: "16px", textTransform: "uppercase" }}>About James Bell</div>
            <blockquote style={{ fontFamily: "var(--F)", fontSize: "clamp(22px,2.5vw,30px)", fontStyle: "italic", lineHeight: "1.5", marginBottom: "28px", color: "var(--ink)", borderLeft: "3px solid var(--gold)", paddingLeft: "24px" }}>"I write for people who take faith seriously enough to let it cost them something."</blockquote>
            <p style={{ fontSize: "15px", lineHeight: "1.85", marginBottom: "16px", color: "var(--ink3)" }}>James Bell is the Lead Teaching Pastor at First Baptist Church of Fenton and founder of the Pastors Connection Network. He trains pastors globally, with focus on remote regions and indigenous tribes.</p>
            <p style={{ fontSize: "15px", lineHeight: "1.85", marginBottom: "32px", color: "var(--ink3)" }}>His platform is built on a single conviction: American Christianity has domesticated the gospel. His writing exposes the comfortable assumptions and systems that serve institutions more than people.</p>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "32px" }}>{["Lead Pastor", "Author of 25 Books", "Pastors Network Founder", "Father of Five"].map((badge, i) => (<div key={i} style={{ background: "#2D4A3E", color: "#F7F5F0", padding: "7px 14px", borderRadius: "2px", fontSize: "11px", fontWeight: "600", fontFamily: "var(--U)" }}>{badge}</div>))}</div>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}><Link href="/about" className="btn-gold">Full Story</Link><Link href="/writing" style={{ color: "var(--gold)", fontFamily: "var(--U)", fontSize: "13px", fontWeight: "600", padding: "15px 0" }}>Read the Essays</Link></div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
         }
