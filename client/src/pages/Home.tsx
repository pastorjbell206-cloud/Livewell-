import { Link } from "wouter";
import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { SEOMeta } from "@/components/SEOMeta";
import { trpc } from "@/lib/trpc";
import Footer from "@/components/Footer";
import MinimalNav from "@/components/MinimalNav";

export default function Home() {
  const [emailInput, setEmailInput] = useState("");
  const [devotionalEmail, setDevotionalEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [devSubmitted, setDevSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const { data: articles } = trpc.posts.listPublished.useQuery();

  const FEATURED_ARTICLES = [
    "The Difference Between Being Tired and Being Done",
    "What Pastors Fear Most (That They Never Say Out Loud)",
    "The Slow Drift That Ends More Marriages Than Dramatic Betrayal Does",
    "When the Church Married Empire",
    "Sabbath as Resistance: Why Resting Is a Radical Act",
    "The Resentment in Your Marriage Is Telling You Something Worth Hearing",
    "What the Bible Actually Says About Submission and What It Doesn't",
    "When One Spouse Carries the Emotional Labor and the Other Doesn't Know It",
    "How to Pastor a Congregation That Is Politically Divided",
    "What a Consistent Pro-Life Ethic Requires Beyond Opposition to Abortion",
    "When Fear Rewrites Theology",
    "The Dark Night of the Soul When God Feels Absent and You Still Have to Preach",
    "Protecting Your Marriage When Ministry Demands Everything",
    "Why Pastors Quit (And How to Stay)",
    "The Hidden Pain of the Successful Pastor",
    "When the Church Becomes a Political Brand",
    "The Conversation You Need to Have With Yourself About Money",
    "The Pastor's Kids Are Watching What Are They Seeing?",
    "When You Married Someone You No Longer Recognize",
    "Your Church Needs You Healthy More Than It Needs You Busy"
  ];

  const filteredArticles = articles?.filter((a: any) =>
    FEATURED_ARTICLES.includes(a.title)
  ) || [];

  const TESTIMONIALS = [
    { quote: "I was six months from walking away from ministry entirely. James's writing on pastoral exhaustion named what I was experiencing better than any counsellor had. The essay on the difference between being tired and being done gave me language for something I couldn't articulate. I'm still in the pulpit. That matters.", name: "Pastor M.T.", role: "Lead Pastor, Midwest", rating: 5 },
    { quote: "I've read a lot of Christian leadership content. Most of it is thin. James writes with theological weight and pastoral honesty that I rarely find in the same place. I send his articles to my staff team. They reference them in elder meetings.", name: "Rev. D.K.", role: "Senior Pastor, Southeast US", rating: 5 },
    { quote: "My husband and I were in a season where we were living like roommates and calling it fine. The article on emotional labor in marriage was the first time either of us could name what was actually happening. We talked for three hours after reading it. We're in a completely different place now.", name: "S.L.", role: "Married 11 years, Pacific Northwest", rating: 5 },
    { quote: "We were weeks away from separating. A friend forwarded the article on the slow drift in marriage. We still needed counselling but this was the first thing that made us both feel understood rather than accused. We're still together and genuinely happy.", name: "Anonymous couple", role: "Submitted via email", rating: 5 },
    { quote: "James writes about justice the way it should be written. Scripture in one hand, honest reckoning in the other. No sloganeering, no tribalism. Just the careful thinking the church desperately needs. I assign his articles to our church leaders.", name: "Pastor J.W.", role: "Church planter, Urban Northeast", rating: 5 },
    { quote: "I found LiveWell during a crisis of faith. I wasn't sure I believed anything anymore. The theological depth here gave me somewhere to stand. I'm still wrestling. But toward something now, not away from it.", name: "R.H.", role: "Seminary graduate, Texas", rating: 5 }
  ];

  const CATEGORIES = [
    { icon: "scroll", name: "Theological Depth", slug: "theology", color: "#2D4A3E", description: "Greek, Hebrew, church history, and the hard questions translated for real life.", count: "80+" },
    { icon: "balance", name: "Justice", slug: "justice", color: "#8B4545", description: "The places where the church has been silent when it should have spoken.", count: "65+" },
    { icon: "church", name: "Pastoral Ministry", slug: "pastoral-ministry", color: "#6B8E6F", description: "The hidden weight of leading God's people. Burnout, preaching, conflict, and the soul beneath the calling.", count: "90+" },
    { icon: "ring", name: "Marriage", slug: "marriage", color: "#B8963E", description: "Covenant, conflict, intimacy, and the long haul. The conversations most couples never have.", count: "50+" },
    { icon: "family", name: "Parenting", slug: "parenting", color: "#9B8BA8", description: "Faith formation, discipline, technology, and loving your children well through every season.", count: "40+" },
    { icon: "money", name: "Finances and Generosity", slug: "finances", color: "#6B9B8B", description: "Biblical stewardship and the theology beneath every financial decision you make.", count: "30+" },
    { icon: "candle", name: "Devotionals", slug: "devotionals", color: "#8B9B6F", description: "Short, substantive daily readings rooted in Scripture for individuals, couples, and groups.", count: "Daily" }
  ];

  const AUDIENCES = [
    { name: "Pastors", description: "Burnout, preaching, staff culture, and the soul beneath the calling. For those carrying the weight of leading God's people.", link: "/for-pastors" },
    { name: "Leaders", description: "Vision, character formation, and the interior work that makes leadership worth following.", link: "/for-leaders" },
    { name: "Families", description: "Marriage, parenting, and finances. Theology that actually works at the kitchen table.", link: "/writing?topic=marriage" },
    { name: "Seekers", description: "For those with questions, doubts, and a growing sense that faith should be more than they've been given so far.", link: "/writing?topic=theology" },
    { name: "Small Groups", description: "Discussion guides, reading paths, and devotionals built to help groups go deeper together.", link: "/reading-paths" }
  ];

  const handleEmailSubmit = (e: React.FormEvent, type: string) => {
    e.preventDefault();
    const email = type === 'guide' ? emailInput : devotionalEmail;
    if (!email || !email.includes('@')) return;
    if (type === 'guide') {
      setEmailSubmitted(true);
      setEmailInput('');
    } else {
      setDevSubmitted(true);
      setDevotionalEmail('');
    }
  };

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "James Bell",
    "url": "https://livewellbyjamesbell.com",
    "jobTitle": "Lead Pastor, Author",
    "description": "Lead Teaching Pastor at First Baptist Church of Fenton, founder of the Pastors Connection Network, and author of 25 books on theology, pastoral ministry, and Christian living.",
    "sameAs": ["https://pastorsconnectionnetwork.com", "https://substack.com/@jamesbell333289"]
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "LiveWell by James Bell",
    "url": "https://livewellbyjamesbell.com",
    "description": "Theology that actually works. 880 plus essays on faith, marriage, justice, pastoral ministry, and the Christian life.",
    "potentialAction": { "@type": "SearchAction", "target": "https://livewellbyjamesbell.com/writing?q={search_term_string}", "query-input": "required name=search_term_string" }
  };

  return (
    <div style={{ background: "#F7F5F0" }}>
      <SEOMeta
        title="LiveWell by James Bell"
        description="880+ essays on faith, pastoral ministry, marriage, justice, and the Christian life. By James Bell, Lead Pastor, author of 25 books, and founder of the Pastors Connection Network."
        keywords="theology, pastoral ministry, Christian marriage, faith, James Bell, pastor resources"
        url="https://livewellbyjamesbell.com"
        type="website"
        structuredData={websiteSchema}
      />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />

      <MinimalNav />

      {/* HERO SECTION */}
      <section style={{ background: "#2D4A3E", color: "#F7F5F0", padding: "60px 20px", display: "flex", alignItems: "center", gap: "80px", maxWidth: "1400px", margin: "0 auto", minHeight: "700px", flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: "280px" }}>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: "bold", lineHeight: "1.2", marginBottom: "20px", fontFamily: "Georgia, serif" }}>
            Theology That Actually Works
          </h1>
          <p style={{ fontSize: "12px", lineHeight: "1.8", marginBottom: "12px", color: "#B8963E", fontWeight: "600", letterSpacing: "2px", textTransform: "uppercase" }}>
            LEAD PASTOR · FOUNDER PASTORS CONNECTION NETWORK · AUTHOR
          </p>
          <p style={{ fontSize: "16px", lineHeight: "1.8", marginBottom: "32px", color: "#D1C9BB" }}>
            For pastors, leaders, and families tired of shallow faith. 880+ essays, 25 books, free to start.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginBottom: "40px" }}>
            <Link href="/writing" style={{ textDecoration: "none" }}>
              <button style={{ background: "#B8963E", color: "#1A1A1A", border: "none", padding: "16px 32px", fontSize: "16px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer", width: "100%", maxWidth: "300px" }}>
                Browse All 880+ Essays
              </button>
            </Link>
            <Link href="/pillars" style={{ textDecoration: "none" }}>
              <span style={{ color: "#D4A84F", fontSize: "14px", display: "inline-block" }}>Explore the 5 Pillars</span>
            </Link>
          </div>
          <div style={{ display: "flex", gap: "40px", fontSize: "14px", color: "#D1C9BB", borderTop: "1px solid rgba(255,255,255,0.1)", paddingTop: "24px", flexWrap: "wrap" }}>
            <div><div style={{ fontSize: "24px", fontWeight: "bold", color: "#B8963E" }}>880+</div><div>Essays</div></div>
            <div><div style={{ fontSize: "24px", fontWeight: "bold", color: "#B8963E" }}>25</div><div>Books</div></div>
            <div><div style={{ fontSize: "24px", fontWeight: "bold", color: "#B8963E" }}>4,200+</div><div>Weekly Readers</div></div>
            <div><div style={{ fontSize: "24px", fontWeight: "bold", color: "#B8963E" }}>Free</div><div>to Start</div></div>
          </div>
        </div>
        <div style={{ flex: 1, display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: "40px", minWidth: "260px" }}>
          <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_4533_137f3486.jpeg" alt="James Bell, Lead Pastor and Author" loading="lazy" width="400" height="533" style={{ borderRadius: "8px", width: "100%", maxWidth: "400px", objectFit: "cover", objectPosition: "center top", aspectRatio: "3/4" }} />
        </div>
      </section>

      {/* LEAD MAGNET */}
      <section style={{ background: "#2D4A3E", color: "#F7F5F0", padding: "60px 20px", textAlign: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <div style={{ fontSize: "12px", fontWeight: "bold", letterSpacing: "2px", color: "#B8963E", marginBottom: "12px" }}>FREE DOWNLOAD</div>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "12px", fontFamily: "Georgia, serif" }}>The Complete Guide to the 5 Pillars Framework</h2>
          <p style={{ fontSize: "16px", color: "#D1C9BB", marginBottom: "32px" }}>Understand the framework that organises all 880+ articles on LiveWell.</p>
          {emailSubmitted ? (
            <p style={{ color: "#B8963E", fontWeight: "bold", fontSize: "18px" }}>Check your inbox! The guide is on its way.</p>
          ) : (
            <form onSubmit={(e) => handleEmailSubmit(e, 'guide')} style={{ display: "flex", gap: "12px", maxWidth: "500px", margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
              <input type="email" placeholder="your@email.com" value={emailInput} onChange={(e) => setEmailInput(e.target.value)} required style={{ flex: 1, minWidth: "200px", padding: "12px 16px", border: "none", borderRadius: "4px", fontSize: "14px" }} />
              <button type="submit" style={{ background: "#B8963E", color: "#1A1A1A", border: "none", padding: "12px 24px", fontSize: "14px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer", whiteSpace: "nowrap" }}>Send Me the Guide</button>
            </form>
          )}
        </div>
      </section>

      {/* WHO WE SERVE */}
      <section style={{ background: "linear-gradient(135deg, #2D4A3E 0%, #1A2E22 100%)", color: "#F7F5F0", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", textAlign: "center", marginBottom: "60px", fontFamily: "Georgia, serif", color: "#F7F5F0" }}>Who We Serve</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "40px" }}>
            {AUDIENCES.map((aud, i) => (
              <Link key={i} href={aud.link} style={{ textDecoration: "none" }}>
                <div style={{ background: "rgba(255,255,255,0.08)", color: "#F7F5F0", padding: "32px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)", display: "flex", flexDirection: "column", cursor: "pointer" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px", color: "#F7F5F0" }}>{aud.name}</h3>
                  <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#D1C9BB", marginBottom: "16px", flex: 1 }}>{aud.description}</p>
                  <span style={{ color: "#B8963E", fontSize: "14px", fontWeight: "bold" }}>Explore</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* EXPLORE BY TOPIC */}
      <section style={{ background: "#F0EDE5", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "16px", fontFamily: "Georgia, serif", color: "#1A1A1A" }}>Explore by Topic</h2>
          <p style={{ fontSize: "16px", color: "#6B7280", marginBottom: "48px" }}>880+ essays organized across seven core areas of faith and life.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px" }}>
            {CATEGORIES.map((cat, i) => (
              <Link key={i} href={"/writing?topic=" + cat.slug} style={{ textDecoration: "none" }}>
                <div style={{ background: "#FFF", borderRadius: "8px", overflow: "hidden", border: "1px solid #E0D9CC", borderLeft: "8px solid " + cat.color, padding: "24px", cursor: "pointer", height: "100%" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "8px", color: "#1A1A1A" }}>{cat.name}</h3>
                  <p style={{ fontSize: "13px", lineHeight: "1.6", color: "#6B7280", marginBottom: "12px" }}>{cat.description}</p>
                  <div style={{ fontSize: "12px", fontWeight: "bold", color: cat.color }}>{cat.count} articles</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED ESSAYS */}
      <section style={{ background: "#F7F5F0", color: "#1C1510", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "40px", fontFamily: "Georgia, serif", color: "#1C1510" }}>Featured Essays</h2>
          <div style={{ display: "flex", gap: "24px", marginBottom: "40px", borderBottom: "1px solid #C8BFB0", paddingBottom: "16px", overflowX: "auto" }}>
            {['All', 'Pastoral', 'Marriage', 'Justice', 'Theology', 'Finances'].map((tab) => (
              <button key={tab} onClick={() => setActiveTab(tab.toLowerCase())} style={{ padding: "8px 0", background: "none", border: "none", borderBottom: activeTab === tab.toLowerCase() ? "3px solid #B8963E" : "none", color: activeTab === tab.toLowerCase() ? "#B8963E" : "#1C1510", fontWeight: activeTab === tab.toLowerCase() ? "bold" : "normal", fontSize: "14px", cursor: "pointer", whiteSpace: "nowrap" }}>{tab}</button>
            ))}
          </div>
          {filteredArticles.length === 0 ? (
            <div style={{ textAlign: "center", padding: "60px 0", color: "#6B7280" }}>
              <p style={{ fontSize: "18px", marginBottom: "16px" }}>Essays loading...</p>
              <Link href="/writing" style={{ textDecoration: "none", color: "#B8963E", fontWeight: "bold" }}>Browse all essays</Link>
            </div>
          ) : (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "32px" }}>
              {filteredArticles.slice(0, 20).filter((article: any) => {
                if (activeTab === 'all') return true;
                const topic = (article.topic || '').toLowerCase();
                if (activeTab === 'pastoral') return topic.includes('pastoral');
                if (activeTab === 'marriage') return topic.includes('marriage');
                if (activeTab === 'justice') return topic.includes('justice');
                if (activeTab === 'theology') return topic.includes('theolog');
                if (activeTab === 'finances') return topic.includes('financ');
                return true;
              }).map((article: any, i: number) => (
                <Link key={i} href={"/writing/" + article.slug} style={{ textDecoration: "none" }}>
                  <div style={{ background: "#FFF", padding: "24px", borderRadius: "8px", border: "1px solid #E0D9CC", cursor: "pointer", height: "100%", display: "flex", flexDirection: "column" }}>
                    <div style={{ fontSize: "11px", fontWeight: "bold", color: "#B8963E", marginBottom: "8px", textTransform: "uppercase" }}>{article.topic || 'ESSAY'}</div>
                    <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "8px", color: "#1A1A1A", flex: 1, lineHeight: "1.4" }}>{article.title}</h3>
                    <div style={{ fontSize: "12px", color: "#6B7280" }}>{article.readTime || "5 min read"}</div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div style={{ textAlign: "center", marginTop: "48px" }}>
            <Link href="/writing" style={{ textDecoration: "none" }}>
              <button style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "12px 32px", background: "#1A1A1A", color: "#F7F5F0", border: "none", borderRadius: "4px", fontWeight: "bold", fontSize: "14px", cursor: "pointer" }}>Browse All 880+ Essays</button>
            </Link>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section style={{ background: "#2D4A3E", color: "#F7F5F0", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "12px", textAlign: "center", fontFamily: "Georgia, serif" }}>What readers are saying</h2>
          <p style={{ fontSize: "16px", textAlign: "center", color: "#D1C9BB", marginBottom: "60px" }}>Pastors, leaders, couples, and seekers from across the community.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} style={{ background: "rgba(255,255,255,0.05)", padding: "32px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>
                <div style={{ display: "flex", gap: "4px", marginBottom: "16px" }}>
                  {[...Array(t.rating)].map((_, j) => (<Star key={j} size={16} fill="#B8963E" color="#B8963E" />))}
                </div>
                <p style={{ fontSize: "14px", lineHeight: "1.8", marginBottom: "16px", fontStyle: "italic" }}>"{t.quote}"</p>
                <div style={{ fontSize: "12px" }}>
                  <div style={{ fontWeight: "bold" }}>{t.name}</div>
                  <div style={{ color: "#D1C9BB" }}>{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BOOKS PREVIEW */}
      <section style={{ background: "#1A1A1A", color: "#F7F5F0", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "16px", fontFamily: "Georgia, serif" }}>25 Books by James Bell</h2>
          <p style={{ fontSize: "16px", color: "#D1C9BB", marginBottom: "48px" }}>From pastoral burnout to prophetic justice. A library for people who take faith seriously.</p>
          <Link href="/books" style={{ textDecoration: "none" }}>
            <button style={{ background: "#B8963E", color: "#1A1A1A", border: "none", padding: "16px 32px", fontSize: "15px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer" }}>View All 25 Books</button>
          </Link>
        </div>
      </section>

      {/* DEVOTIONAL STRIP */}
      <section style={{ background: "#2D4A3E", color: "#F7F5F0", padding: "60px 20px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", gap: "60px", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: "280px" }}>
            <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px", fontFamily: "Georgia, serif" }}>Start every morning rooted.</h2>
            <p style={{ fontSize: "14px", lineHeight: "1.8", marginBottom: "24px", color: "#D1C9BB" }}>A short, substantive daily devotional. Scripture, honest reflection, and a prayer. Free to your inbox every morning.</p>
            {devSubmitted ? (
              <p style={{ color: "#B8963E", fontWeight: "bold" }}>You're subscribed. Check your inbox tomorrow morning.</p>
            ) : (
              <form onSubmit={(e) => handleEmailSubmit(e, 'devotional')} style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <input type="email" placeholder="your@email.com" value={devotionalEmail} onChange={(e) => setDevotionalEmail(e.target.value)} required style={{ flex: 1, minWidth: "200px", maxWidth: "300px", padding: "12px 16px", border: "none", borderRadius: "4px", fontSize: "14px" }} />
                <button type="submit" style={{ background: "#B8963E", color: "#1A1A1A", border: "none", padding: "12px 24px", fontSize: "14px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer", whiteSpace: "nowrap" }}>Subscribe Free</button>
              </form>
            )}
          </div>
          <div style={{ flex: 1, minWidth: "280px" }}>
            <div style={{ background: "rgba(255,255,255,0.05)", padding: "32px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>
              <div style={{ fontSize: "12px", color: "#B8963E", fontWeight: "bold", marginBottom: "8px" }}>TODAY'S DEVOTIONAL</div>
              <h3 style={{ fontSize: "16px", fontWeight: "bold", marginBottom: "12px" }}>The Weight of Witness</h3>
              <p style={{ fontSize: "13px", lineHeight: "1.6", color: "#D1C9BB" }}>"You will receive power when the Holy Spirit comes on you; and you will be my witnesses..." Acts 1:8</p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section style={{ background: "#F7F5F0", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto", display: "flex", gap: "80px", alignItems: "center", flexWrap: "wrap" }}>
          <div style={{ flex: "0 0 auto" }}>
            <img src="https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_4533_137f3486.jpeg" alt="James Bell, Lead Pastor, Author, Founder of Pastors Connection Network" loading="lazy" width="360" height="360" style={{ borderRadius: "8px", width: "100%", maxWidth: "360px", objectFit: "cover", aspectRatio: "1" }} />
          </div>
          <div style={{ flex: 1, minWidth: "280px" }}>
            <div style={{ fontSize: "12px", fontWeight: "bold", letterSpacing: "2px", color: "#B8963E", marginBottom: "12px" }}>ABOUT JAMES BELL</div>
            <p style={{ fontSize: "24px", fontStyle: "italic", lineHeight: "1.6", marginBottom: "24px", color: "#1A1A1A", fontFamily: "Georgia, serif" }}>"I write for people who take faith seriously enough to let it cost them something."</p>
            <p style={{ fontSize: "14px", lineHeight: "1.8", marginBottom: "16px", color: "#6B7280" }}>James Bell is the Lead Teaching Pastor at First Baptist Church of Fenton and founder of the Pastors Connection Network, connecting pastors across denominational lines around the gospel and kingdom advancement. He trains pastors globally, with particular focus on pastors in remote regions and indigenous tribes.</p>
            <p style={{ fontSize: "14px", lineHeight: "1.8", marginBottom: "32px", color: "#6B7280" }}>His platform, LiveWell by James Bell, is built on a single conviction: American Christianity has domesticated the gospel. His writing exposes the comfortable assumptions, unexamined traditions, and systems that serve institutions more than people.</p>
            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap", marginBottom: "32px" }}>
              {["Lead Pastor", "Author of 25 Books", "Pastors Network Founder", "Father of Five"].map((badge, i) => (
                <div key={i} style={{ background: "#2D4A3E", color: "#F7F5F0", padding: "8px 16px", borderRadius: "4px", fontSize: "12px", fontWeight: "bold" }}>{badge}</div>
              ))}
            </div>
            <Link href="/about" style={{ textDecoration: "none" }}>
              <button style={{ background: "#B8963E", color: "#1A1A1A", border: "none", padding: "12px 24px", fontSize: "14px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer" }}>Full Story</button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
