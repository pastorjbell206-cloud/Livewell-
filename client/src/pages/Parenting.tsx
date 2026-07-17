import { Link } from "wouter";
import { SEOMeta } from "@/components/SEOMeta";
import MinimalNav from "@/components/MinimalNav";
import Footer from "@/components/Footer";
import { NewsletterSignup } from "@/components/NewsletterSignup";
import PillarLeadMagnet from "@/components/PillarLeadMagnet";
import { PullQuote, StatementBand } from "@/components/EditorialBlocks";

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
        description="Raising kids who think, question, and believe. Christian parenting on faith formation, doubt, and technology, for every season."
        keywords="Christian parenting, raising kids in faith, how to talk to kids about God, faith and teenagers, parenting resources, Christian family"
        url="https://www.livewellbyjamesbell.co/parenting"
        type="webpage"
      />

      <MinimalNav />

      {/* HERO SECTION */}
      <section style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", padding: "80px 20px", minHeight: "600px", display: "flex", alignItems: "center" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)", fontWeight: "bold", lineHeight: "1.2", marginBottom: "24px", fontFamily: "var(--F)" }}>
            Raising Kids Who Think, Question, and Believe
          </h1>
          <p style={{ fontSize: "18px", lineHeight: "1.8", marginBottom: "32px", color: "var(--stone2)" }}>
            Parenting is theology in practice. What you do at the dinner table matters more than what happens on Sunday morning.
          </p>
        </div>
      </section>


      {/* TEACHING — care/orientation before the link grid (depth sweep) */}
      <section style={{ background: "var(--bone-warm)", padding: "72px 20px" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.8, color: "var(--ink)", maxWidth: "68ch", marginBottom: "22px" }}>You hand your children your faith the way you handed them your accent — not by teaching it, but by living where they can hear it.</p>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.8, color: "var(--ink)", maxWidth: "68ch", marginBottom: "22px" }}>Most parenting advice aims at behavior, because behavior is what shows. But children inherit the thing underneath it: whether the God they heard about on Sunday is the God they watched you trust on Thursday. That is heavier than any technique, and it is also freeing. You do not have to have the answers. You have to be found honest.</p>
          <p style={{ fontFamily: "var(--B)", fontSize: "18px", lineHeight: 1.8, color: "var(--ink)", maxWidth: "68ch", marginBottom: "0" }}>Formation is caught before it is taught.</p>
          </div>
      </section>

      {/* FEATURED ARTICLES */}
      <section style={{ background: "var(--paper)", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "48px", fontFamily: "var(--F)", color: "var(--ink)" }}>
            Essential Reading for Parents
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(300px, 100%), 1fr))", gap: "32px" }}>
            {FEATURED_ARTICLES.map((article, i) => (
              <Link key={i} href={"/writing/" + article.slug} style={{ textDecoration: "none" }}>
                <div style={{ background: "var(--card)", padding: "32px", borderRadius: "8px", border: "1px solid var(--border)", cursor: "pointer", height: "100%", display: "flex", flexDirection: "column" }}>
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

      <StatementBand tone="dark" eyebrow="Formation, not performance">
        You are not raising a performance; you are raising a person who will believe, or not, on their own.
      </StatementBand>

      {/* CONVERSATION STARTERS BY AGE */}
      <section style={{ background: "var(--paper2)", padding: "80px 20px" }}>
        <div style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "12px", fontFamily: "var(--F)", color: "var(--ink)" }}>
            What to Talk About, by Age
          </h2>
          <p style={{ fontSize: "16px", color: "var(--ink3)", marginBottom: "48px" }}>
            The themes worth raising at each stage — and the stage guide that shows you how to actually have the conversation.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(300px, 100%), 1fr))", gap: "32px" }}>
            {AGE_GROUPS.map((group, i) => (
              <Link key={i} href="/tools/parenting-guide" style={{ textDecoration: "none" }}>
                <div style={{ background: "var(--card)", borderRadius: "8px", overflow: "hidden", border: "1px solid var(--border)", borderLeft: "8px solid var(--mustard)", padding: "28px", height: "100%" }}>
                  <h3 style={{ fontSize: "18px", fontWeight: "bold", marginBottom: "16px", color: "var(--ink)" }}>
                    {group.range}
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "18px" }}>
                    {group.topics.map((topic, j) => (
                      <div key={j} style={{ fontSize: "14px", color: "var(--ink3)", paddingLeft: "16px" }}>
                        • {topic}
                      </div>
                    ))}
                  </div>
                  <div style={{ fontSize: "13px", fontWeight: "bold", color: "var(--mustard-text)" }}>
                    Open the stage guide →
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <PullQuote>Faith is not argued into a child. It is lived in front of one.</PullQuote>
        </div>
      </section>

      {/* LEAD MAGNET — email-gated reading path */}
      <PillarLeadMagnet
        kicker="Free Reading Path"
        title="The Parenting Reading Path"
        blurb="Three studies from a father of five — formation over performance, presence over advice. From the long work of raising believers to the particular weight a father carries. A short PDF to read alone or with the other parent in the house."
        slug="parenting"
        downloadLabel="Get the reading path (PDF)"
        source="reading-path-parenting"
      />

      {/* NEWSLETTER STRIP — real form, no silent failures */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-4)" }}>
        <div style={{ maxWidth: "var(--w-content)", margin: "0 auto" }}>
          {/* Tools for parents (QW-19): the instruments this hub never mentioned */}
          <div style={{ margin: "0 0 48px" }}>
            <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "16px" }}>TOOLS FOR PARENTS</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "14px" }}>
              {[
                { href: "/tools/family-devotions", title: "Family devotion builder", desc: "Pick your kids' ages and a theme; get a complete 15-minute devotion." },
                { href: "/tools/parenting-guide", title: "Parenting stage guide", desc: "What your child needs at each age, and one practice to start this week." },
                { href: "/tools/parenting-verses", title: "Scripture for parents", desc: "Verses for the real moments — fear, anger, screens, doubt, and the day you blow it." },
                { href: "/family/catechism", title: "Family catechism", desc: "Questions and answers a household can actually carry." },
              ].map((t) => (
                <Link key={t.href} href={t.href} style={{ textDecoration: "none" }}>
                  <div style={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "3px", padding: "18px 20px", height: "100%" }}>
                    <p style={{ fontFamily: "var(--U)", fontSize: "15px", fontWeight: 600, color: "var(--ink)", margin: "0 0 6px" }}>{t.title}</p>
                    <p style={{ fontFamily: "var(--B)", fontSize: "14px", lineHeight: 1.6, color: "var(--ink-muted)", margin: 0 }}>{t.desc}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

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
          <div style={{ marginTop: "20px" }}>
            <Link href="/life/raising-children-in-grace" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)", textDecoration: "none" }}>Or read the deep guide: Raising Children in Grace</Link>
          </div>
          <div style={{ marginTop: "12px" }}>
            <Link href="/diagnostic" style={{ fontFamily: "var(--U)", fontWeight: 600, color: "var(--mustard-text)", textDecoration: "none" }}>Start with the Life Diagnostic: ten minutes, the whole picture</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
