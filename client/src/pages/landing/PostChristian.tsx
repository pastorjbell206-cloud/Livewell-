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
    { title: "What Is Christendom, and What Comes After It?", slug: "christendom-is-ending" },
  ],
};

const TIER_2 = {
  label: "Tier 2: The Denominations",
  desc: "The traditions and their branches — each carrying real wisdom and real blind spots.",
  articles: [
    { title: "Catholic, Orthodox, Protestant: The Three Families of Christianity", slug: "three-families-of-christianity" },
    { title: "A Guide to Every Major Denomination", slug: "guide-to-every-major-denomination" },
    { title: "Why Are There So Many Christian Denominations?", slug: "why-there-are-so-many-christian-denominations" },
    { title: "What Calvinism and Arminianism Actually Argue About", slug: "calvinism-and-arminianism" },
    { title: "Liturgical vs. Contemporary Worship: What We Gained and Lost", slug: "liturgical-vs-contemporary-worship" },
    { title: "What Is Historic Christianity? The Faith Older Than America", slug: "the-faith-once-delivered" },
    { title: "The Charismatic Movement Inside Every Denomination", slug: "charismatic-movement-inside-every-denomination" },
    { title: "The History of the Black Church in America and Why It Matters", slug: "the-black-church-in-america" },
    { title: "Pentecostalism and the Global South", slug: "pentecostalism-and-the-global-south" },
  ],
};

const TIER_3 = {
  label: "Tier 3: The Cultural Christ",
  desc: "How Christianity became a brand, a weapon, and a voting bloc.",
  articles: [
    { title: "History of the Religious Right: How Evangelicals Became Political", slug: "how-the-religious-right-was-built" },
    { title: "What Is the Prosperity Gospel, and Is It Biblical?", slug: "prosperity-gospel-is-not-the-gospel" },
    { title: "What Is Purity Culture? History, Harm, and What the Bible Says", slug: "purity-culture-and-its-wreckage" },
    { title: "White Evangelicalism and Race", slug: "white-evangelicalism-and-race" },
    { title: "Are Megachurches Good for Christianity? What Worked, What Didn't", slug: "megachurch-model" },
    { title: "Domestic Abuse and the Church: What Christians Must Do", slug: "church-domestic-violence" },
    { title: "Why Did Christians Lose the Culture War? What the Defeat Revealed", slug: "why-the-church-lost-the-culture-war" },
    { title: "Were Christian Missions Just Colonialism? An Honest History", slug: "colonialism-and-missions" },
  ],
};

const TIER_4 = {
  label: "Tier 4: The Skeptic's Questions",
  desc: "The hardest objections to Christianity, taken seriously.",
  articles: [
    { title: "Is God Real? An Honest Assessment", slug: "is-god-real" },
    { title: "If God Is Good, Why Is There Suffering? An Honest Answer", slug: "if-god-is-good-why-suffering" },
    { title: "Can You Trust the Bible? What the Historical Evidence Shows", slug: "why-trust-the-bible" },
    { title: "What Christians Actually Believe About Hell", slug: "what-christians-believe-about-hell" },
    { title: "Does Science Disprove God? The History of Faith and Science", slug: "faith-and-science" },
    { title: "How Should Christians Read Genesis 1? Creation and Evolution", slug: "how-to-read-genesis-one" },
    { title: "What Happened to the Historical Jesus", slug: "the-historical-jesus" },
    { title: "Do Miracles Still Happen Today? What Christians Actually Believe", slug: "do-miracles-still-happen" },
    { title: "Why Christianity and Not Another Religion? An Honest Answer", slug: "why-christianity" },
  ],
};

const TIER_5 = {
  label: "Tier 5: The Deconstruction",
  desc: "For anyone taking their faith apart to see what holds — and anyone the church has hurt.",
  articles: [
    { title: "Why Are People Leaving the Church? The Rise of the Nones", slug: "why-people-are-leaving-the-church" },
    { title: "What Is Faith Deconstruction, and What Does Exvangelical Mean?", slug: "deconstruction-is-not-destruction" },
    { title: "Can You Have Faith and Doubt at the Same Time?", slug: "can-you-have-faith-and-doubt" },
    { title: "What Is Religious Trauma? Signs of Spiritual Abuse in the Church", slug: "religious-trauma-is-real" },
    { title: "Sexual Abuse in the Church and How Churches Should Respond", slug: "sexual-abuse-crisis-in-the-church" },
    { title: "Is Depression a Lack of Faith? Why 'Just Pray About It' Fails", slug: "mental-health-and-the-church-beyond-pray-about-it" },
  ],
};

const TIER_6 = {
  label: "Tier 6: Living After Christendom",
  desc: "Faith worked out in the ordinary rooms once the culture stopped assuming it.",
  articles: [
    { title: "How to Talk About Your Faith Without Being Weird or Pushy", slug: "how-to-talk-about-faith" },
    { title: "Raising Christian Kids in a Secular Culture: Exile, Not Siege", slug: "raising-kids-post-christian" },
    { title: "What Is Vocation? A Christian View of Work and Calling", slug: "what-is-vocation-work-as-calling" },
    { title: "Married to an Unbeliever, or Thinking of It? What the Bible Says", slug: "interfaith-marriage" },
    { title: "Is Your Phone Shaping Your Soul? Faith in the Age of Algorithms", slug: "digital-discipleship" },
    { title: "How to Find a Good Church: What to Look For and What to Avoid", slug: "how-to-find-a-church-worth-joining" },
    { title: "When Your Family Thinks You've Lost Your Mind Over Your Faith", slug: "family-and-faith-transitions" },
    { title: "Can Women Be Pastors? What the Bible Says About Women in Ministry", slug: "women-in-ministry" },
  ],
};

const TIER_7 = {
  label: "Tier 7: What Remains",
  desc: "After the collapse, what is left standing — and what the other traditions can teach.",
  articles: [
    { title: "What Is Christendom, and What Comes After It?", slug: "christendom-is-ending" },
    { title: "What Is Faith Deconstruction, and What Does Exvangelical Mean?", slug: "deconstruction-is-not-destruction" },
    { title: "The Jewish Roots of Christianity: What Christians Owe Judaism", slug: "what-christians-can-learn-from-judaism" },
    { title: "Christianity vs Islam: What Is the Real Difference?", slug: "christianity-and-islam" },
    { title: "What Christians Can Learn From Buddhism, and Where They Differ", slug: "what-christians-can-learn-from-buddhism" },
    { title: "What Can Christians Learn From Native American Faith Traditions?", slug: "what-christians-can-learn-from-indigenous-spirituality" },
    { title: "Who Were the Christian Mystics, and What Can They Teach Us?", slug: "the-christian-mystics" },
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
        <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px,5vw,60px)", fontWeight: 400, color: "var(--charcoal-fg)", maxWidth: "780px", margin: "0 auto", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          The end of cultural Christianity might be the beginning of actual Christianity.
        </h1>
        <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "rgba(255,255,255,0.6)", marginTop: "32px", maxWidth: "600px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
          Sixty essays in seven tiers, tracing how the faith that shaped the West lost its cultural hold, and what, if anything, remains when the scaffolding falls.
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
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--charcoal-fg)", marginBottom: "24px" }}>Why this series exists</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, marginBottom: "20px", maxWidth: "68ch" }}>
            Christianity is not dying. Something is dying. The version of Christianity that required cultural power, political alignment, and social respectability to survive — that version is over. What is emerging on the other side may turn out to look more like the church before Constantine than the one Christendom built. That is a claim to be argued, not assumed, and the essays here try to earn it.
          </p>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "rgba(255,255,255,0.75)", lineHeight: 1.7, maxWidth: "68ch" }}>
            These sixty essays trace the full arc: how Christianity gained the world, what it lost in the process, why people are leaving, what legitimate grievances they carry, and whether anything on the other side of this collapse is worth building on. They were written by a working pastor from inside the room, for the reader who will not accept an easy answer from either direction.
          </p>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>STAY WITH THE SERIES</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "16px" }}>Get new essays as they publish</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted, #5A5448)", marginBottom: "32px", lineHeight: 1.7 }}>One essay a week from the post-Christian series, and nothing else in your inbox. Theology that takes both faith and doubt seriously.</p>
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
            <button style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", border: "none", padding: "12px 28px", fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", borderRadius: "3px", cursor: "pointer" }}>See the book →</button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
