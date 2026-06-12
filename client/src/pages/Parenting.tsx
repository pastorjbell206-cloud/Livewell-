import { Link } from "wouter";
import { SEOMeta } from "@/components/SEOMeta";
import MinimalNav from "@/components/MinimalNav";
import Footer from "@/components/Footer";
import { NewsletterSignup } from "@/components/NewsletterSignup";

export default function Parenting() {

  const FEATURED_ARTICLES = [
    {
      title: "How to Raise Children in the Faith Without Crushing Them",
      slug: "how-to-raise-children-in-the-faith",
      topic: "Parenting",
      readTime: "12 min read"
    },
    {
      title: "What Fatherhood Requires",
      slug: "what-fatherhood-requires",
      topic: "Fatherhood",
      readTime: "12 min read"
    },
    {
      title: "Discipline That Forms the Heart, Not Just the Behavior",
      slug: "parenting-discipline-that-forms-the-heart",
      topic: "Parenting",
      readTime: "9 min read"
    },
    {
      title: "Raising Kids in a Screen and Phone Age",
      slug: "parenting-raising-kids-in-a-screen-age",
      topic: "Parenting",
      readTime: "10 min read"
    },
    {
      title: "When Your Child Doubts or Walks Away",
      slug: "parenting-when-your-child-doubts-or-walks-away",
      topic: "Parenting",
      readTime: "10 min read"
    },
    {
      title: "Teaching Your Kids to Pray and Read the Bible",
      slug: "parenting-teaching-kids-to-pray-and-read-scripture",
      topic: "Parenting",
      readTime: "9 min read"
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

  return (
    <div style={{ background: "var(--paper)" }}>
      <SEOMeta
        title="Christian Parenting Help | LiveWell by James Bell"
        description="Raising kids who think, question, and believe. Christian parenting articles on faith formation, doubt, technology, and loving your children through every season."
        keywords="Christian parenting, raising kids in faith, how to talk to kids about God, faith and teenagers, parenting resources, Christian family"
        url="https://livewellbyjamesbell.co/parenting"
        type="webpage"
      />

      <MinimalNav />

      {/* HERO SECTION */}
      <section style={{ background: "var(--ink)", color: "var(--paper)", padding: "80px 20px", minHeight: "600px", display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: "bold", lineHeight: "1.2", marginBottom: "24px", fontFamily: "var(--F)" }}>
            Raising Kids Who Think, Question, and Believe
          </h1>
          <p style={{ fontSize: "18px", lineHeight: "1.8", marginBottom: "32px", color: "var(--stone2)" }}>
            Parenting is theology in practice. What you do at the dinner table matters more than what happens on Sunday morning.
          </p>
        </div>
      </section>

      {/* FEATURED ARTICLES */}
      <section style={{ background: "var(--paper)", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "48px", fontFamily: "var(--F)", color: "var(--ink)" }}>
            Essential Reading for Parents
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "32px" }}>
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

      {/* CONVERSATION STARTERS BY AGE */}
      <section style={{ background: "var(--paper2)", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "12px", fontFamily: "var(--F)", color: "var(--ink)" }}>
            Parenting Conversation Starters
          </h2>
          <p style={{ fontSize: "16px", color: "var(--ink3)", marginBottom: "48px" }}>
            Age-appropriate ways to talk about faith, doubt, and what your kids are really thinking.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "32px" }}>
            {AGE_GROUPS.map((group, i) => (
              <div key={i} style={{ background: "var(--card)", borderRadius: "8px", overflow: "hidden", border: "1px solid #E0D9CC", borderLeft: "8px solid #9B8BA8", padding: "28px" }}>
                <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px", color: "var(--ink)" }}>
                  {group.range}
                </h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {group.topics.map((topic, j) => (
                    <div key={j} style={{ fontSize: "14px", color: "var(--ink3)", paddingLeft: "16px" }}>
                      • {topic}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEWSLETTER STRIP — real form, no silent failures */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          <NewsletterSignup
            variant="inline"
            source="parenting"
            title="Parenting essays from a father of five."
            description="Formation over performance. Presence over advice. One essay a week to your inbox."
          />
        </div>
      </section>

      {/* CTA SECTION */}
      <section style={{ background: "var(--paper)", padding: "80px 20px" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontSize: "32px", fontWeight: "bold", marginBottom: "16px", fontFamily: "var(--F)", color: "var(--ink)" }}>
            Your children will inherit your doubts before they inherit your certainty.
          </h2>
          <p style={{ fontSize: "16px", lineHeight: "1.8", marginBottom: "32px", color: "var(--ink3)" }}>
            That's not a problem. That's an opportunity to model what genuine faith actually looks like—honest, tested, and holding on anyway.
          </p>
          <Link href="/writing?topic=parenting" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--ink)", color: "var(--paper)", border: "none", padding: "16px 40px", fontSize: "16px", fontWeight: "bold", borderRadius: "4px", cursor: "pointer" }}>
              Browse All Parenting Articles
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
