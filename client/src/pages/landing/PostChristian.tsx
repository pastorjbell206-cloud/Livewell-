import { Link } from "wouter";
import { useState } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { LandingSignup } from "@/components/LandingSignup";

const TIER_1 = {
  label: "Tier 1: The Collapse of Christendom",
  desc: "The historical arc from empire to the post-Christian present.",
  articles: [
    { title: "How Christianity Became an Empire", slug: "how-christianity-became-an-empire" },
    { title: "The Great Schism: When One Church Became Two", slug: "the-great-schism" },
    { title: "What the Reformation Actually Changed", slug: "what-the-reformation-actually-changed" },
    { title: "The Anabaptist Option", slug: "the-anabaptist-option" },
    { title: "How American Christianity Became American", slug: "how-american-christianity-became-american" },
    { title: "The Rise and Fall of Mainline Protestantism", slug: "the-rise-and-fall-of-mainline-protestantism" },
    { title: "What Evangelicalism Was Supposed to Be", slug: "what-evangelicalism-was-supposed-to-be" },
    { title: "The Death of Christendom", slug: "the-death-of-christendom" },
  ],
};

const TIER_2 = {
  label: "Tier 2: The Denominations",
  desc: "The traditions and their branches — each carrying real wisdom and real blind spots.",
  articles: [
    { title: "Catholic, Orthodox, Protestant: The Three Families of Christianity", slug: "three-families-of-christianity" },
    { title: "A Guide to Every Major Denomination", slug: "guide-to-every-major-denomination" },
    { title: "Non-Denominational Doesn't Mean No Tradition", slug: "non-denominational-doesnt-mean-no-tradition" },
    { title: "What Calvinism and Arminianism Actually Argue About", slug: "calvinism-and-arminianism" },
    { title: "Liturgical vs. Contemporary Worship: What We Gained and What We Lost", slug: "liturgical-vs-contemporary-worship" },
    { title: "Creeds, Confessions, and Statements of Faith: Why the Church Wrote Them Down", slug: "creeds-confessions-statements-of-faith" },
    { title: "The Charismatic Movement Inside Every Denomination", slug: "charismatic-movement-inside-every-denomination" },
    { title: "The Black Church: The Most Important Institution in American Christianity", slug: "the-black-church-in-america" },
    { title: "Pentecostalism and the Global South", slug: "pentecostalism-and-the-global-south" },
  ],
};

const TIER_3 = {
  label: "Tier 3: The Cultural Christ",
  desc: "How Christianity became a brand, a weapon, and a voting bloc.",
  articles: [
    { title: "When Politics Replaced Theology", slug: "when-politics-replaced-theology" },
    { title: "The Prosperity Gospel Is Not the Gospel", slug: "prosperity-gospel-is-not-the-gospel" },
    { title: "Purity Culture and Its Wreckage", slug: "purity-culture-and-its-wreckage" },
    { title: "White Evangelicalism and Race", slug: "white-evangelicalism-and-race" },
    { title: "The Megachurch Model: What Worked, What Didn't, What's Next", slug: "megachurch-model" },
    { title: "Toxic Masculinity in the Pulpit", slug: "toxic-masculinity-in-the-pulpit" },
    { title: "Why the Church Lost the Culture War", slug: "why-the-church-lost-the-culture-war" },
    { title: "Colonialism and Missions", slug: "colonialism-and-missions" },
  ],
};

const TIER_4 = {
  label: "Tier 4: The Skeptic's Questions",
  desc: "The hardest objections to Christianity, taken seriously.",
  articles: [
    { title: "Is God Real? An Honest Assessment", slug: "is-god-real" },
    { title: "Why Does God Allow Suffering?", slug: "why-does-god-allow-suffering" },
    { title: "Can You Trust the Bible?", slug: "can-you-trust-the-bible" },
    { title: "What Christians Actually Believe About Hell", slug: "what-christians-believe-about-hell" },
    { title: "Science and Faith Are Not at War", slug: "science-and-faith-are-not-at-war" },
    { title: "Evolution and Genesis: A Pastor's Guide", slug: "evolution-and-genesis" },
    { title: "What Happened to the Historical Jesus", slug: "the-historical-jesus" },
    { title: "Miracles: Do They Still Happen?", slug: "do-miracles-still-happen" },
    { title: "Why Christianity and Not Something Else?", slug: "why-christianity" },
  ],
};

const TIER_5 = {
  label: "Tier 5: The Deconstruction",
  desc: "For anyone taking their faith apart to see what holds — and anyone the church has hurt.",
  articles: [
    { title: "Why People Are Leaving the Church", slug: "why-people-are-leaving-the-church" },
    { title: "Deconstruction Is Not Destruction", slug: "deconstruction-is-not-destruction" },
    { title: "The Rise of the Nones", slug: "the-rise-of-the-nones" },
    { title: "Exvangelical: When Leaving Isn't Losing Faith", slug: "exvangelical-when-leaving-isnt-losing-faith" },
    { title: "The Problem with Certainty", slug: "the-problem-with-certainty" },
    { title: "The Spirituality of Doubt", slug: "the-spirituality-of-doubt" },
    { title: "Religious Trauma Is Real", slug: "religious-trauma-is-real" },
    { title: "Spiritual Abuse: How Good Theology Gets Weaponized", slug: "spiritual-abuse-how-good-theology-gets-weaponized" },
    { title: "The Sexual Abuse Crisis: A Reckoning the Church Cannot Avoid", slug: "sexual-abuse-crisis-in-the-church" },
    { title: "How the Church Handles Mental Health (Badly)", slug: "church-and-mental-health" },
    { title: "Why Young Adults Aren't Coming Back", slug: "why-young-adults-arent-coming-back" },
  ],
};

const TIER_6 = {
  label: "Tier 6: Living After Christendom",
  desc: "Faith worked out in the ordinary rooms once the culture stopped assuming it.",
  articles: [
    { title: "How to Talk About Faith Without Being Weird", slug: "how-to-talk-about-faith" },
    { title: "Raising Kids in a Post-Christian Culture", slug: "raising-kids-post-christian" },
    { title: "Faith at Work When Nobody Shares It", slug: "faith-at-work" },
    { title: "Interfaith Marriage: When You Love Someone Who Doesn't Believe", slug: "interfaith-marriage" },
    { title: "Digital Discipleship: Spiritual Formation in the Age of Algorithms", slug: "digital-discipleship" },
    { title: "How to Find a Church That Won't Hurt You", slug: "finding-a-good-church" },
    { title: "When Your Family Thinks You've Lost Your Mind", slug: "family-and-faith-transitions" },
    { title: "Women in Ministry: The Biblical Case the Church Keeps Ignoring", slug: "women-in-ministry" },
  ],
};

const TIER_7 = {
  label: "Tier 7: What Remains",
  desc: "After the collapse, what is left standing — and what the other traditions can teach.",
  articles: [
    { title: "Christianity After Christendom", slug: "christianity-after-christendom" },
    { title: "Reconstructing Faith: What Comes After Deconstruction", slug: "reconstructing-faith" },
    { title: "What Christians Can Learn From Judaism", slug: "what-christians-can-learn-from-judaism" },
    { title: "What Christians Can Learn From Islam", slug: "what-christians-can-learn-from-islam" },
    { title: "What Christians Can Learn From Buddhism", slug: "what-christians-can-learn-from-buddhism" },
    { title: "What Christians Can Learn From Indigenous Spirituality", slug: "what-christians-can-learn-from-indigenous-spirituality" },
    { title: "The Mystics: Christianity's Best-Kept Secret", slug: "the-christian-mystics" },
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
  const [expandedTier, setExpandedTier] = useState<number | null>(0);


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
          Sixty essays. Seven tiers. The full story of how the most powerful religious movement in Western history is losing its grip — and what, if anything, remains when the scaffolding falls.
        </p>
      </section>

      {/* Reading Paths */}
      <section style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>WHERE TO START</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "32px" }}>Four paths into sixty essays</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px" }}>
            {READING_PATHS.map((p) => (
              <Link key={p.link} href={p.link} style={{ textDecoration: "none" }}>
                <div style={{ background: "var(--card)", padding: "24px", borderRadius: "3px", border: "1px solid rgba(0,0,0,0.06)" }}>
                  <p style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 400, color: "var(--ink)", marginBottom: "8px" }}>{p.label}</p>
                  <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.6, marginBottom: "12px" }}>{p.desc}</p>
                  <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--mustard-text)" }}>Start here</span>
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
            <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "16px" }}>{tier.label.toUpperCase()}</p>
            <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "8px" }}>{tier.label.split(": ")[1]}</h2>
            <p style={{ fontFamily: "var(--U)", fontSize: "15px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, marginBottom: "24px" }}>{tier.desc}</p>

            <button
              onClick={() => setExpandedTier(expandedTier === tierIndex ? null : tierIndex)}
              style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--mustard-text)", background: "none", border: "none", cursor: "pointer", padding: "0", marginBottom: expandedTier === tierIndex ? "16px" : "0" }}
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
                      <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--mustard-text)" }}>Read</span>
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
            Christianity is not dying. Something is dying. The version of Christianity that required cultural power, political alignment, and social respectability to survive — that version is over. What is emerging on the other side may be closer to the original thing than anything Christendom ever produced.
          </p>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, maxWidth: "68ch" }}>
            These sixty essays trace the full arc: how Christianity gained the world, what it lost in the process, why people are leaving, what legitimate grievances they carry, and whether anything on the other side of this collapse is worth building on. Written by a pastor. Written from inside the room. Written for anyone who refuses to settle for easy answers in either direction.
          </p>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>STAY WITH THE SERIES</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "16px" }}>Get new essays as they publish</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted, #5A5448)", marginBottom: "32px", lineHeight: 1.7 }}>One essay a week from the post-Christian series. No spam. No guilt. Theology that takes both faith and doubt seriously.</p>
          <LandingSignup source="landing-post-christian" />
        </div>
      </section>

      {/* Book CTA */}
      <section style={{ background: "var(--bone-warm)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>FROM THE AUTHOR</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "16px" }}>The Deconstruction of Faith</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "52ch", marginLeft: "auto", marginRight: "auto" }}>
            The book-length treatment of the ideas in this series. For anyone who wants to go deeper than an essay can take you.
          </p>
          <Link href="/books/deconstruction-of-faith" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--charcoal)", color: "white", border: "none", padding: "12px 28px", fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", borderRadius: "3px", cursor: "pointer" }}>See the book →</button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
