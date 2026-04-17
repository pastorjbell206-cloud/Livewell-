import { Link } from "wouter";
import { useState } from "react";
import { SEOMeta } from "@/components/SEOMeta";
import MinimalNav from "@/components/MinimalNav";
import Footer from "@/components/Footer";

export default function Doubt() {
  const [emailInput, setEmailInput] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const FEATURED_ARTICLES = [
    {
      title: "When Fear Rewrites Theology",
      slug: "when-fear-rewrites-theology",
      topic: "Faith & Doubt",
      readTime: "10 min read"
    },
    {
      title: "When the Church Married Empire",
      slug: "when-church-married-empire",
      topic: "Faith & Doubt",
      readTime: "12 min read"
    },
    {
      title: "When God Doesn't Make Sense",
      slug: "when-god-doesnt-make-sense",
      topic: "Faith & Doubt",
      readTime: "11 min read"
    },
    {
      title: "What If We're Wrong?",
      slug: "what-if-we-are-wrong",
      topic: "Faith & Doubt",
      readTime: "13 min read"
    },
    {
      title: "The Dark Night of the Soul When God Feels Absent",
      slug: "dark-night-god-feels-absent",
      topic: "Faith & Doubt",
      readTime: "14 min read"
    },
    {
      title: "Constantine's Bargain",
      slug: "constantines-bargain",
      topic: "Faith & Doubt",
      readTime: "11 min read"
    }
  ];

  const START_HERE_PATHS = [
    {
      title: "I used to believe, but now I'm not sure",
      description: "For those who had faith and are now questioning. You're not alone. And this might be the most honest part of your journey.",
      icon: "←"
    },
    {
      title: "Someone I love is questioning their faith",
      description: "For parents, friends, and pastors watching someone you care about walk away. How to stay present without defending.",
      icon: "🤝"
    },
    {
      title: "I've never believed but I'm curious",
      description: "For seekers, skeptics, and the genuinely undecided. What the Christian story actually claims and why it matters.",
      icon: "?"
    }
  ];

  const HARD_QUESTIONS = [
    "Is God real?",
    "Why does God allow suffering?",
    "Is the Bible reliable?",
    "What about other religions?",
    "Can I doubt and still have faith?"
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
        title="Faith Crisis & Doubt | LiveWell by James Bell"
        description="Honest theology for those with questions. Articles on faith crisis, doubting God, deconstructing faith, and finding honest belief when doubt won't go away."
        keywords="faith crisis, doubting God, deconstructing faith, is it okay to doubt, hard questions about Christianity, faith and doubt"
        url="https://livewellbyjamesbell.co/doubt"
        type="webpage"
      />

      <MinimalNav />

      {/* HERO SECTION */}
      <section style={{ background: "#2D4A3E", color: "#F7F5F0", padding: "80px 20px", minHeight: "600px", display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: "bold", lineHeight: "1.2", marginBottom: "24px", fontFamily: "Georgia, serif" }}>
            When the Questions Won't Stop
          </h1>
          <p style={{ fontSize: "18px", lineHeight: "1.8", marginBottom: "32px", color: "#D1C9BB" }}>
            You're not losing your faith. You might be finding a faith worth keeping. Theology for the honest, the questioning, and the ones who refuse to pretend.
          </p>
        </div>
      </section>

      {/* START HERE CARDS */}
      <section style={{ background: "#F7F5F0", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "48px", fontFamily: "Georgia, serif", color: "#1A1A1A" }}>
            Start Here
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
            {START_HERE_PATHS.map((path, i) => (
              <Link key={i} href="/writing?topic=theology" style={{ textDecoration: "none" }}>
                <div style={{ background: "#FFF", padding: "40px", borderRadius: "8px", border: "1px solid #E0D9CC", cursor: "pointer", height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: "32px", marginBottom: "16px" }}>
                    {path.icon}
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px", color: "#1A1A1A" }}>
                    {path.title}
                  </h3>
                  <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#6B7280", flex: 1 }}>
                    {path.description}
                  </p>
                  <span style={{ color: "#B8963E", fontSize: "14px", fontWeight: "bold", marginTop: "16px" }}>
                    Explore path →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED ARTICLES */}
      <section style={{ background: "#F0EDE5", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "48px", fontFamily: "Georgia, serif", color: "#1A1A1A" }}>
            Deep Theological Reading
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "32px" }}>
            {FEATURED_ARTICLES.map((article, i) => (
              <Link key={i} href={"/writing/" + article.slug} style={{ textDecoration: "none" }}>
                <div style={{ background: "#FFF", padding: "32px", borderRadius: "8px", border: "1px solid #E0D9CC", cursor: "pointer", height: "100%", display: "flex", flexDirection: "column" }}>
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

      {/* HARD QUESTIONS */}
      <section style={{ background: "#F7F5F0", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "12px", fontFamily: "Georgia, serif", color: "#1A1A1A" }}>
            Hard Questions, Honest Answers
          </h2>
          <p style={{ fontSize: "16px", color: "#6B7280", marginBottom: "48px" }}>
            The questions that keep people up at night. We have articles on all of them.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
            {HARD_QUESTIONS.map((question, i) => (
              <Link key={i} href="/writing?topic=theology" style={{ textDecoration: "none" }}>
                <div style={{ background: "#2D4A3E", color: "#F7F5F0", padding: "32px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: "100px" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: "bold", margin: 0 }}>
                    {question}
                  </h3>
                  <span style={{ fontSize: "20px", marginLeft: "16px" }}>→</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER STRIP */}
      <section style={{ background: "#2D4A3E", color: "#F7F5F0", padding: "60px 20px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px", fontFamily: "Georgia, serif" }}>
            Theology for the honest.
          </h2>
          <p style={{ fontSize: "14px", lineHeight: "1.8", marginBottom: "32px", color: "#D1C9BB" }}>
            Essays on faith, doubt, Scripture, and what to do when your questions feel dangerous. Twice weekly to your inbox.
          </p>
          {emailSubmitted ? (
            <p style={{ color: "#B8963E", fontWeight: "bold", fontSize: "16px" }}>
              Check your inbox. Your questions matter.
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
            Your doubt doesn't disqualify you.
          </h2>
          <p style={{ fontSize: "16px", lineHeight: "1.8", marginBottom: "32px", color: "#6B7280" }}>
            It might be the beginning of the truest faith you'll ever have. Not faith that requires you to stop thinking. Faith that holds up under real questions.
          </p>
          <Link href="/writing?topic=theology" style={{ textDecoration: "none" }}>
            <button style={{ background: "#2D4A3E", color: "#F7F5F0", border: "none", padding: "16px 40px", fontSize: "16px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer" }}>
              Browse All Theological Articles
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
