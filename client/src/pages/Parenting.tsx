import { Link } from "wouter";
import { useState } from "react";
import { SEOMeta } from "@/components/SEOMeta";
import MinimalNav from "@/components/MinimalNav";
import Footer from "@/components/Footer";

export default function Parenting() {
  const [emailInput, setEmailInput] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  const FEATURED_ARTICLES = [
    {
      title: "The Pastor's Kids Are Watching What Are They Seeing?",
      slug: "the-pastors-kids-are-watching",
      topic: "Parenting",
      readTime: "9 min read"
    },
    {
      title: "How to Talk to Your Kids About Faith When You're Not Sure What You Believe",
      slug: "how-to-talk-kids-faith-doubt",
      topic: "Parenting",
      readTime: "10 min read"
    },
    {
      title: "When Your Teenager Says They Don't Believe Anymore",
      slug: "teenager-losing-faith",
      topic: "Parenting",
      readTime: "11 min read"
    },
    {
      title: "Family Devotions That Don't Feel Forced",
      slug: "family-devotions-authentic",
      topic: "Parenting",
      readTime: "8 min read"
    },
    {
      title: "Raising Sons in a World Confused About Manhood",
      slug: "raising-sons-manhood",
      topic: "Parenting",
      readTime: "12 min read"
    },
    {
      title: "The Conversation About Doubt Your Kids Need You to Start",
      slug: "teaching-kids-about-doubt",
      topic: "Parenting",
      readTime: "10 min read"
    }
  ];

  const AGE_GROUPS = [
    {
      range: "Ages 5-8",
      topics: ["Faith basics", "God's character", "Bible stories", "Prayer"]
    },
    {
      range: "Ages 9-12",
      topics: ["Doubt as normal", "Other beliefs", "Bible questions", "Personal faith"]
    },
    {
      range: "Ages 13-17",
      topics: ["Deconstruction", "Real questions", "Peer pressure", "Finding your own faith"]
    }
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
        title="Christian Parenting Help | LiveWell by James Bell"
        description="Raising kids who think, question, and believe. Christian parenting articles on faith formation, doubt, technology, and loving your children through every season."
        keywords="Christian parenting, raising kids in faith, how to talk to kids about God, faith and teenagers, parenting resources, Christian family"
        url="https://livewellbyjamesbell.co/parenting"
        type="webpage"
      />

      <MinimalNav />

      {/* HERO SECTION */}
      <section style={{ background: "#2D4A3E", color: "#F7F5F0", padding: "80px 20px", minHeight: "600px", display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: "bold", lineHeight: "1.2", marginBottom: "24px", fontFamily: "Georgia, serif" }}>
            Raising Kids Who Think, Question, and Believe
          </h1>
          <p style={{ fontSize: "18px", lineHeight: "1.8", marginBottom: "32px", color: "#D1C9BB" }}>
            Parenting is theology in practice. What you do at the dinner table matters more than what happens on Sunday morning.
          </p>
        </div>
      </section>

      {/* FEATURED ARTICLES */}
      <section style={{ background: "#F7F5F0", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "48px", fontFamily: "Georgia, serif", color: "#1A1A1A" }}>
            Essential Reading for Parents
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

      {/* CONVERSATION STARTERS BY AGE */}
      <section style={{ background: "#F0EDE5", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "12px", fontFamily: "Georgia, serif", color: "#1A1A1A" }}>
            Parenting Conversation Starters
          </h2>
          <p style={{ fontSize: "16px", color: "#6B7280", marginBottom: "48px" }}>
            Age-appropriate ways to talk about faith, doubt, and what your kids are really thinking.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
            {AGE_GROUPS.map((group, i) => (
              <div key={i} style={{ background: "#FFF", borderRadius: "8px", overflow: "hidden", border: "1px solid #E0D9CC", borderLeft: "8px solid #9B8BA8", padding: "28px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px", color: "#1A1A1A" }}>
                  {group.range}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {group.topics.map((topic, j) => (
                    <div key={j} style={{ fontSize: "14px", color: "#6B7280", paddingLeft: "16px" }}>
                      • {topic}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER STRIP */}
      <section style={{ background: "#2D4A3E", color: "#F7F5F0", padding: "60px 20px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px", fontFamily: "Georgia, serif" }}>
            Parenting resources for the long haul.
          </h2>
          <p style={{ fontSize: "14px", lineHeight: "1.8", marginBottom: "32px", color: "#D1C9BB" }}>
            Twice-weekly essays, devotionals for families, and conversation starters. For parents who care more about character than compliance.
          </p>
          {emailSubmitted ? (
            <p style={{ color: "#B8963E", fontWeight: "bold", fontSize: "16px" }}>
              Check your inbox. Welcome to the journey.
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
            Your children will inherit your doubts before they inherit your certainty.
          </h2>
          <p style={{ fontSize: "16px", lineHeight: "1.8", marginBottom: "32px", color: "#6B7280" }}>
            That's not a problem. That's an opportunity to model what genuine faith actually looks like—honest, tested, and holding on anyway.
          </p>
          <Link href="/writing?topic=parenting" style={{ textDecoration: "none" }}>
            <button style={{ background: "#2D4A3E", color: "#F7F5F0", border: "none", padding: "16px 40px", fontSize: "16px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer" }}>
              Browse All Parenting Articles
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
