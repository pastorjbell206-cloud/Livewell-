import { Link } from "wouter";
import { SEOMeta } from "@/components/SEOMeta";
import MinimalNav from "@/components/MinimalNav";
import Footer from "@/components/Footer";
import { NewsletterSignup } from "@/components/NewsletterSignup";

export default function Doubt() {

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
      description: "For those who had faith and are now questioning. You're not alone. And this might be the most honest part of what you are walking through.",
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

  return (
    <div style={{ background: "var(--paper)" }}>
      <SEOMeta
        title="Faith Crisis & Doubt | LiveWell by James Bell"
        description="Honest theology for those with questions. Articles on faith crisis, doubting God, deconstructing faith, and finding honest belief when doubt won't go away."
        keywords="faith crisis, doubting God, deconstructing faith, is it okay to doubt, hard questions about Christianity, faith and doubt"
        url="https://www.livewellbyjamesbell.co/doubt"
        type="webpage"
      />

      <MinimalNav />

      {/* HERO SECTION */}
      <section style={{ background: "var(--ink)", color: "var(--paper)", padding: "80px 20px", minHeight: "600px", display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: "bold", lineHeight: "1.2", marginBottom: "24px", fontFamily: "var(--F)" }}>
            When the Questions Won't Stop
          </h1>
          <p style={{ fontSize: "18px", lineHeight: "1.8", marginBottom: "32px", color: "var(--stone2)" }}>
            You're not losing your faith. You might be finding a faith worth keeping. Theology for the honest, the questioning, and the ones who refuse to pretend.
          </p>
        </div>
      </section>

      {/* START HERE CARDS */}
      <section style={{ background: "var(--paper)", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "48px", fontFamily: "var(--F)", color: "var(--ink)" }}>
            Start Here
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: "32px" }}>
            {START_HERE_PATHS.map((path, i) => (
              <Link key={i} href="/writing?topic=theology" style={{ textDecoration: "none" }}>
                <div style={{ background: "var(--card)", padding: "40px", borderRadius: "8px", border: "1px solid #E0D9CC", cursor: "pointer", height: "100%", display: "flex", flexDirection: "column" }}>
                  <div style={{ fontSize: "32px", marginBottom: "16px" }}>
                    {path.icon}
                  </div>
                  <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "12px", color: "var(--ink)" }}>
                    {path.title}
                  </h3>
                  <p style={{ fontSize: "14px", lineHeight: "1.6", color: "var(--ink3)", flex: 1 }}>
                    {path.description}
                  </p>
                  <span style={{ color: "var(--gold)", fontSize: "14px", fontWeight: "bold", marginTop: "16px" }}>
                    Explore path →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED ARTICLES */}
      <section style={{ background: "var(--paper2)", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "48px", fontFamily: "var(--F)", color: "var(--ink)" }}>
            Deep Theological Reading
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: "32px" }}>
            {FEATURED_ARTICLES.map((article, i) => (
              <Link key={i} href={"/writing/" + article.slug} style={{ textDecoration: "none" }}>
                <div style={{ background: "var(--card)", padding: "32px", borderRadius: "8px", border: "1px solid #E0D9CC", cursor: "pointer", height: "100%", display: "flex", flexDirection: "column" }}>
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

      {/* HARD QUESTIONS */}
      <section style={{ background: "var(--paper)", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "12px", fontFamily: "var(--F)", color: "var(--ink)" }}>
            Hard Questions, Honest Answers
          </h2>
          <p style={{ fontSize: "16px", color: "var(--ink3)", marginBottom: "48px" }}>
            The questions that keep people up at night. We have articles on all of them.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "24px" }}>
            {HARD_QUESTIONS.map((question, i) => (
              <Link key={i} href="/writing?topic=theology" style={{ textDecoration: "none" }}>
                <div style={{ background: "var(--ink)", color: "var(--paper)", padding: "32px", borderRadius: "8px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between", minHeight: "100px" }}>
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

      {/* One instrument for the doubter (QW-19): locate the questions, no grade */}
      <section style={{ background: "var(--bone-warm)", padding: "64px 20px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "16px" }}>IF YOU WANT A MAP</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,34px)", fontWeight: 400, color: "var(--ink)", marginBottom: "14px" }}>Find out where your questions actually sit</h2>
          <p style={{ fontFamily: "var(--B)", fontSize: "16px", lineHeight: 1.75, color: "var(--ink-muted)", maxWidth: "54ch", margin: "0 auto 26px" }}>
            The Theology Quiz is not a test, and there is no grade. It maps where
            your foundations are solid and where the gaps are, then hands you the
            reading that meets you there instead of a verdict.
          </p>
          <Link href="/tools/theology-quiz" style={{ display: "inline-block", background: "var(--ink)", color: "var(--bone)", padding: "13px 28px", fontFamily: "var(--U)", fontSize: "14px", fontWeight: 600, borderRadius: "3px", textDecoration: "none" }}>
            Take the quiz
          </Link>
        </div>
      </section>

      {/* NEWSLETTER STRIP — real form */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <NewsletterSignup
            variant="inline"
            source="doubt"
            title="Theology for the honest."
            description="When the questions outgrow the answers. One essay a week. Written without conversion bait."
          />
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ background: "var(--paper)", padding: "80px 20px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px", fontFamily: "var(--F)", color: "var(--ink)" }}>
            Your doubt doesn't disqualify you.
          </h2>
          <p style={{ fontSize: "16px", lineHeight: "1.8", marginBottom: "32px", color: "var(--ink3)" }}>
            It might be the beginning of the truest faith you'll ever have. Not faith that requires you to stop thinking. Faith that holds up under real questions.
          </p>
          <Link href="/writing?topic=theology" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--ink)", color: "var(--paper)", border: "none", padding: "16px 40px", fontSize: "16px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer" }}>
              Browse All Theological Articles
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
