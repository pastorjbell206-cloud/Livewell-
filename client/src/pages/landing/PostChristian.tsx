import { Link } from "wouter";
import { useState } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const TIER_1 = {
  label: "Tier 1: The Collapse of Christendom",
  desc: "The historical arc from Constantine to the post-Christian present.",
  articles: [
    { title: "The Rise and Fall of Christendom", slug: "the-rise-and-fall-of-christendom" },
    { title: "Constantine's Bargain", slug: "constantines-bargain" },
    { title: "When the Church Married Empire", slug: "when-church-married-empire" },
    { title: "The Great Schism", slug: "the-great-schism" },
    { title: "The Reformation and Its Consequences", slug: "the-reformation-and-its-consequences" },
    { title: "The Enlightenment and the Crisis of Authority", slug: "the-enlightenment-and-the-crisis-of-authority" },
    { title: "The Age of Revivals", slug: "the-age-of-revivals" },
    { title: "The Social Gospel and Its Critics", slug: "the-social-gospel-and-its-critics" },
    { title: "The Fundamentalist-Modernist Controversy", slug: "the-fundamentalist-modernist-controversy" },
    { title: "Christianity in a Post-Christian Age", slug: "christianity-in-a-post-christian-age" },
  ],
};

const TIER_2 = {
  label: "Tier 2: The Denominations",
  desc: "Seven traditions. Each carrying real wisdom and real blind spots.",
  articles: [
    { title: "The Catholic Intellectual Tradition", slug: "the-catholic-intellectual-tradition" },
    { title: "The Orthodox Way", slug: "the-orthodox-way" },
    { title: "The Mainline Protestant Collapse", slug: "the-mainline-protestant-collapse" },
    { title: "The Evangelical Movement", slug: "the-evangelical-movement" },
    { title: "The Pentecostal Explosion", slug: "the-pentecostal-explosion" },
    { title: "The Black Church Tradition", slug: "the-black-church-tradition" },
    { title: "Christianity in the Global South", slug: "christianity-in-the-global-south" },
  ],
};

const TIER_3 = {
  label: "Tier 3: The Cultural Christ",
  desc: "How Christianity became a brand, a weapon, and a voting bloc.",
  articles: [
    { title: "Christian Nationalism", slug: "christian-nationalism" },
    { title: "The Prosperity Gospel", slug: "the-prosperity-gospel" },
    { title: "Performative Faith", slug: "performative-faith" },
    { title: "The Celebrity Pastor Problem", slug: "the-celebrity-pastor-problem" },
    { title: "When the Church Became a Brand", slug: "when-the-church-became-a-brand" },
    { title: "The Wreckage of Purity Culture", slug: "the-wreckage-of-purity-culture" },
    { title: "The Church and Race", slug: "the-church-and-race" },
    { title: "The Sexual Abuse Crisis in the Church", slug: "the-sexual-abuse-crisis-in-the-church" },
  ],
};

const TIER_4 = {
  label: "Tier 4: The Skeptic's Questions",
  desc: "The hardest objections to Christianity, taken seriously.",
  articles: [
    { title: "Is God Real?", slug: "is-god-real" },
    { title: "Why Does God Allow Suffering?", slug: "why-does-god-allow-suffering" },
    { title: "Is the Bible Reliable?", slug: "is-the-bible-reliable" },
    { title: "What About Other Religions?", slug: "what-about-other-religions" },
    { title: "Has Science Disproved God?", slug: "has-science-disproved-god" },
    { title: "Why Is the Church So Hypocritical?", slug: "why-is-the-church-so-hypocritical" },
    { title: "Is Hell Real?", slug: "is-hell-real" },
    { title: "Can I Doubt and Still Have Faith?", slug: "can-i-doubt-and-still-have-faith" },
    { title: "What About the Violence in the Old Testament?", slug: "what-about-the-violence-in-the-old-testament" },
    { title: "Does Christianity Oppress Women?", slug: "does-christianity-oppress-women" },
  ],
};

const TIER_5 = {
  label: "Tier 5: The Deconstruction",
  desc: "For anyone taking their faith apart to see what holds.",
  articles: [
    { title: "Deconstruction Is Not Destruction", slug: "deconstruction-is-not-destruction" },
    { title: "The Rise of the Nones", slug: "the-rise-of-the-nones" },
    { title: "The Exvangelical Movement", slug: "the-exvangelical-movement" },
    { title: "Reconstructing Faith After Deconstruction", slug: "reconstructing-faith-after-deconstruction" },
    { title: "The Spirituality of Doubt", slug: "the-spirituality-of-doubt" },
    { title: "The Problem with Certainty", slug: "the-problem-with-certainty" },
    { title: "Religious Trauma Is Real", slug: "religious-trauma-is-real" },
    { title: "Spiritual Abuse in the Church", slug: "spiritual-abuse-in-the-church" },
    { title: "The Church and Mental Health", slug: "the-church-and-mental-health" },
    { title: "How to Find a Church That Won't Hurt You", slug: "how-to-find-a-church-that-wont-hurt-you" },
  ],
};

const TIER_6 = {
  label: "Tier 6: The World After Christendom",
  desc: "What fills the vacuum when Christianity loses cultural authority.",
  articles: [
    { title: "Morality Without God", slug: "morality-without-god" },
    { title: "The Meaning Crisis", slug: "the-meaning-crisis" },
    { title: "The Loneliness Epidemic and the Loss of Community", slug: "the-loneliness-epidemic-and-the-loss-of-community" },
    { title: "Politics as Religion", slug: "politics-as-religion" },
    { title: "The Rise of Secular Spirituality", slug: "the-rise-of-secular-spirituality" },
    { title: "Technology as Salvation", slug: "technology-as-salvation" },
    { title: "The Death of Institutions", slug: "the-death-of-institutions" },
    { title: "Identity Without Transcendence", slug: "identity-without-transcendence" },
  ],
};

const TIER_7 = {
  label: "Tier 7: What Remains",
  desc: "After the collapse, what is left standing.",
  articles: [
    { title: "The Case for the Resurrection", slug: "the-case-for-the-resurrection" },
    { title: "What Christianity Actually Claims", slug: "what-christianity-actually-claims" },
    { title: "The Sermon on the Mount and the Good Life", slug: "the-sermon-on-the-mount-and-the-good-life" },
    { title: "The Church the World Needs Now", slug: "the-church-the-world-needs-now" },
    { title: "A Faith for Grown-Ups", slug: "a-faith-for-grown-ups" },
    { title: "Christianity After Christendom", slug: "christianity-after-christendom" },
    { title: "An Invitation to the Skeptic", slug: "an-invitation-to-the-skeptic" },
  ],
};

const ALL_TIERS = [TIER_1, TIER_2, TIER_3, TIER_4, TIER_5, TIER_6, TIER_7];

const READING_PATHS = [
  { label: "The Skeptic", desc: "Start with the hardest questions. No padding.", link: "/honest-questions" },
  { label: "The Deconstructing", desc: "For the person pulling the threads.", link: "/deconstruction" },
  { label: "The Hurt", desc: "For anyone the church has failed.", link: "/church-hurt" },
  { label: "The History", desc: "The full arc from the early church to now.", link: "/church-history" },
];

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "The Post-Christian Series: 60 Essays on Faith, Doubt, and What Remains",
  description: "Sixty essays tracing what happens when a culture built on Christianity begins to move past it. History, deconstruction, hard questions, and what still holds.",
  url: "https://www.livewellbyjamesbell.co/post-christian",
  author: {
    "@type": "Person",
    name: "James Bell",
    url: "https://www.livewellbyjamesbell.co/about",
  },
  publisher: {
    "@type": "Organization",
    name: "LiveWell by James Bell",
  },
  numberOfItems: 60,
};

export default function PostChristian() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [expandedTier, setExpandedTier] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <Layout>
      <SEOMeta
        title="The Post-Christian Series: 60 Essays on Faith, Doubt, and What Remains"
        description="Sixty essays tracing what happens when a culture built on Christianity begins to move past it. History, deconstruction, hard questions, and what still holds."
        keywords="post-Christian, Christianity declining, church decline, faith and culture, Christendom, deconstruction, doubt and faith, leaving church, future of Christianity"
        structuredData={webPageSchema}
      />

      {/* Hero */}
      <section style={{ background: "var(--charcoal)", padding: "clamp(80px,12vw,160px) 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>THE POST-CHRISTIAN SERIES</p>
        <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px,5vw,60px)", fontWeight: 400, color: "white", maxWidth: "780px", margin: "0 auto", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          The end of cultural Christianity might be the beginning of actual Christianity.
        </h1>
        <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "rgba(255,255,255,0.6)", marginTop: "32px", maxWidth: "600px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
          Sixty essays. Seven tiers. The full story of how the most powerful religious movement in Western history is losing its grip -- and what, if anything, remains when the scaffolding falls.
        </p>
      </section>

      {/* Reading Paths */}
      <section style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>WHERE TO START</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "32px" }}>Four paths into sixty essays</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            {READING_PATHS.map((p) => (
              <Link key={p.link} href={p.link} style={{ textDecoration: "none" }}>
                <div style={{ background: "var(--card)", padding: "24px", borderRadius: "3px", border: "1px solid rgba(0,0,0,0.06)" }}>
                  <p style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 400, color: "var(--ink)", marginBottom: "8px" }}>{p.label}</p>
                  <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.6, marginBottom: "12px" }}>{p.desc}</p>
                  <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--mustard)" }}>Start here</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* All Tiers */}
      {ALL_TIERS.map((tier, tierIndex) => (
        <section key={tierIndex} style={{ background: tierIndex % 2 === 0 ? "var(--bone-warm)" : "var(--bone)", padding: "80px 24px" }}>
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "16px" }}>{tier.label.toUpperCase()}</p>
            <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "8px" }}>{tier.label.split(": ")[1]}</h2>
            <p style={{ fontFamily: "var(--U)", fontSize: "15px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, marginBottom: "24px" }}>{tier.desc}</p>

            <button
              onClick={() => setExpandedTier(expandedTier === tierIndex ? null : tierIndex)}
              style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--mustard)", background: "none", border: "none", cursor: "pointer", padding: "0", marginBottom: expandedTier === tierIndex ? "16px" : "0" }}
              aria-expanded={expandedTier === tierIndex}
            >
              {expandedTier === tierIndex ? "Collapse" : `Show ${tier.articles.length} essays`}
            </button>

            {expandedTier === tierIndex && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                {tier.articles.map((a) => (
                  <Link key={a.slug} href={`/writing/${a.slug}`} style={{ textDecoration: "none" }}>
                    <div style={{ padding: "16px 0", borderBottom: "1px solid rgba(0,0,0,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontFamily: "var(--F)", fontSize: "18px", fontWeight: 400, color: "var(--ink)" }}>{a.title}</span>
                      <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--mustard)" }}>Read</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>
      ))}

      {/* The Argument */}
      <section style={{ background: "var(--charcoal)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>THE ARGUMENT</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "white", marginBottom: "24px" }}>Why this series exists</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: "20px", maxWidth: "68ch" }}>
            Christianity is not dying. Something is dying. The version of Christianity that required cultural power, political alignment, and social respectability to survive -- that version is over. What is emerging on the other side may be closer to the original thing than anything Christendom ever produced.
          </p>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, maxWidth: "68ch" }}>
            These sixty essays trace the full arc: how Christianity gained the world, what it lost in the process, why people are leaving, what legitimate grievances they carry, and whether anything on the other side of this collapse is worth building on. Written by a pastor. Written from inside the room. Written for anyone who refuses to settle for easy answers in either direction.
          </p>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>STAY WITH THE SERIES</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "16px" }}>Get new essays as they publish</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted, #5A5448)", marginBottom: "32px", lineHeight: 1.7 }}>One essay a week from the post-Christian series. No spam. No guilt. Theology that takes both faith and doubt seriously.</p>
          {submitted ? (
            <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--mustard)" }}>Thank you. Check your inbox.</p>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px", maxWidth: "440px", margin: "0 auto" }}>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" style={{ flex: 1, padding: "12px 16px", border: "1px solid var(--bone-muted)", background: "var(--card)", color: "var(--ink)", fontFamily: "var(--U)", fontSize: "14px", borderRadius: "3px", outline: "none" }} />
              <button type="submit" style={{ background: "var(--mustard)", color: "var(--ink)", border: "none", padding: "12px 24px", fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", borderRadius: "3px", cursor: "pointer", whiteSpace: "nowrap" }}>Subscribe</button>
            </form>
          )}
        </div>
      </section>

      {/* Book CTA */}
      <section style={{ background: "var(--bone-warm)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>FROM THE AUTHOR</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "16px" }}>The Deconstruction of Faith</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "52ch", marginLeft: "auto", marginRight: "auto" }}>
            The book-length treatment of the ideas in this series. For anyone who wants to go deeper than an essay can take you.
          </p>
          <Link href="/books/deconstruction-of-faith" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--charcoal)", color: "white", border: "none", padding: "12px 28px", fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", borderRadius: "3px", cursor: "pointer" }}>Learn More</button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
