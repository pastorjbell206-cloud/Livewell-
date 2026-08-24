import { Link } from "wouter";
import { useState } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { LandingSignup } from "@/components/LandingSignup";

const TIER_1_ARTICLES = [
  { title: "The Rise and Fall of Christendom", href: "/writing/christendom-is-ending" },
  { title: "Constantine's Bargain", href: "/writing/constantines-bargain" },
  { title: "When the Church Married Empire", href: "/theology/history/the-constantinian-turn" },
  { title: "The Great Schism", href: "/theology/history/the-east-west-schism" },
  { title: "The Reformation and Its Consequences", href: "/theology/history/the-reformation" },
  { title: "The Enlightenment and the Crisis of Authority", href: "/writing/authority-we-traded-for-authenticity" },
  { title: "The Age of Revivals", href: "/theology/history/the-awakenings" },
  { title: "The Social Gospel and Its Critics", href: "/writing/when-justice-becomes-a-gospel" },
  { title: "The Fundamentalist-Modernist Controversy", href: "/theology/history" },
  { title: "Christianity in a Post-Christian Age", href: "/writing/the-church-after-cultural-power" },
];

const TIER_2_ARTICLES = [
  { title: "The Catholic Intellectual Tradition", href: "/theology/history/the-medieval-west" },
  { title: "The Orthodox Way", href: "/theology/history/the-church-that-outlived-rome" },
  { title: "The Mainline Protestant Collapse", href: "/writing/the-numbers-behind-the-decline" },
  { title: "The Evangelical Movement", href: "/theology/history/the-awakenings" },
  { title: "The Pentecostal Explosion", href: "/theology/history/the-global-church" },
  { title: "The Black Church Tradition", href: "/writing/black-church-prophetic-justice" },
  { title: "Christianity in the Global South", href: "/theology/history/the-global-church" },
];

const TIMELINE_EVENTS = [
  { year: "33 AD", label: "The Early Church", desc: "A handful of followers in an occupied territory." },
  { year: "313", label: "Constantine's Edict", desc: "Christianity goes from persecuted to preferred." },
  { year: "1054", label: "The Great Schism", desc: "East and West divide. The fracture never heals." },
  { year: "1517", label: "The Reformation", desc: "Luther's theses. The church splinters again." },
  { year: "1789", label: "The Enlightenment", desc: "Reason challenges revelation. The terms change." },
  { year: "1906", label: "Azusa Street", desc: "Pentecostalism erupts. Christianity goes charismatic." },
  { year: "1925", label: "Scopes Trial", desc: "Fundamentalism and modernism draw battle lines." },
  { year: "2020s", label: "The Post-Christian West", desc: "The Christendom model collapses. What comes next?" },
];

const FAQ_ITEMS = [
  {
    question: "Why does church history matter for today?",
    answer: "Because every theological argument you have heard this week is a replay of a conversation that happened centuries ago. You cannot understand where Christianity is going if you do not understand where it has been. The present is always a footnote to the past."
  },
  {
    question: "When did Christianity become the dominant Western religion?",
    answer: "The turning point is 313 AD, when Constantine issued the Edict of Milan. Within a generation Christianity went from persecuted minority to imperial favorite — and by 380, under Theodosius, to the empire's official religion. That marriage of church and state shaped — and distorted — Christianity for the next seventeen centuries."
  },
  {
    question: "What caused the Protestant Reformation?",
    answer: "The short answer is Martin Luther's 95 Theses in 1517. The real answer is centuries of corruption, the sale of indulgences, and a growing gap between what the church preached and what it practiced. The Reformation was not one man's protest. It was a dam breaking."
  },
  {
    question: "What is the difference between Catholic, Orthodox, and Protestant?",
    answer: "Catholicism centers on apostolic succession and papal authority. Orthodoxy emphasizes mystery, liturgy, and conciliar authority. Protestantism insists on Scripture alone and the priesthood of all believers. Each tradition carries real wisdom and real blind spots. These essays take all three seriously."
  },
  {
    question: "Is Christianity dying in the West?",
    answer: "Cultural Christianity is dying. Whether actual Christianity is dying depends on what you mean by Christianity. If you mean the Christendom model — state-sponsored, culturally assumed, socially rewarded — yes, that is over. If you mean a living faith that costs something and changes the people who hold it, the story is more complicated than the headlines suggest."
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Church History: The Full Arc from the Early Church to the Post-Christian Age",
  description: "Seventeen essays tracing the full story of Christianity from the apostles to the present collapse of Christendom. History as theology, not trivia.",
  url: "https://www.livewellbyjamesbell.co/church-history",
  author: {
    "@type": "Person",
    name: "James Bell",
    url: "https://www.livewellbyjamesbell.co/about",
  },
  publisher: {
    "@type": "Organization",
    name: "LiveWell by James Bell",
  },
};

export default function ChurchHistory() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);


  return (
    <Layout>
      <SEOMeta
        title="Church History: The Full Arc from the Early Church to the Post-Christian Age"
        description="Seventeen essays tracing the full story of Christianity from the apostles to the present collapse of Christendom. History as theology, not trivia."
        keywords="church history, history of Christianity, Christendom, Reformation, Great Schism, Constantine, early church, post-Christian, Christian denominations"
        structuredData={[faqSchema, webPageSchema]}
      />

      {/* Hero */}
      <section style={{ background: "var(--charcoal)", padding: "clamp(80px,12vw,160px) 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>CHURCH HISTORY</p>
        <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px,5vw,60px)", fontWeight: 400, color: "var(--charcoal-fg)", maxWidth: "780px", margin: "0 auto", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          You cannot understand where Christianity is going until you understand where it has been.
        </h1>
        <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "rgba(255,255,255,0.6)", marginTop: "32px", maxWidth: "560px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
          Two thousand years. The full story of how a movement that began with twelve people in an occupied territory became the defining force of Western civilization — and what is happening now that it is not.
        </p>
      </section>

      {/* Timeline */}
      <section style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>THE ARC</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "40px" }}>Two thousand years in eight turning points</h2>
          <div style={{ position: "relative", paddingLeft: "32px" }}>
            <div style={{ position: "absolute", left: "7px", top: "8px", bottom: "8px", width: "2px", background: "var(--bone-muted)" }} />
            {TIMELINE_EVENTS.map((event, i) => (
              <div key={i} style={{ position: "relative", marginBottom: i < TIMELINE_EVENTS.length - 1 ? "32px" : "0" }}>
                <div style={{ position: "absolute", left: "-32px", top: "6px", width: "16px", height: "16px", borderRadius: "50%", background: i === TIMELINE_EVENTS.length - 1 ? "var(--mustard)" : "var(--bone-muted)", border: "3px solid var(--bone)" }} />
                <p style={{ fontFamily: "var(--U)", fontSize: "12px", letterSpacing: "0.1em", color: "var(--mustard-text)", marginBottom: "4px", fontWeight: 500 }}>{event.year}</p>
                <p style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 400, color: "var(--ink)", marginBottom: "4px" }}>{event.label}</p>
                <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.6 }}>{event.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tier 1 Articles */}
      <section style={{ background: "var(--bone-warm)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>THE MAIN NARRATIVE</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "16px" }}>Ten essays that tell the whole story</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "15px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, marginBottom: "32px" }}>Start here. These ten essays trace the full arc of Christianity from its origin to the present crisis. Read in order or follow your questions.</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {TIER_1_ARTICLES.map((a, i) => (
              <Link key={a.href} href={a.href} style={{ textDecoration: "none" }}>
                <div style={{ padding: "20px 0", borderBottom: "1px solid rgba(0,0,0,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
                    <span style={{ fontFamily: "var(--U)", fontSize: "12px", color: "var(--ink-muted, #5A5448)", minWidth: "20px" }}>{i + 1}</span>
                    <span style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 400, color: "var(--ink)" }}>{a.title}</span>
                  </div>
                  <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--mustard-text)" }}>Read</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Tier 2 Articles */}
      <section style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>THE TRADITIONS</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "16px" }}>Seven essays on the branches that grew from the same root</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "15px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, marginBottom: "32px" }}>Christianity is not one thing. It is many traditions, each carrying real wisdom and real failures. These essays take each one seriously on its own terms.</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {TIER_2_ARTICLES.map((a) => (
              <Link key={a.href} href={a.href} style={{ textDecoration: "none" }}>
                <div style={{ padding: "20px 0", borderBottom: "1px solid rgba(0,0,0,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 400, color: "var(--ink)" }}>{a.title}</span>
                  <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--mustard-text)" }}>Read</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "var(--bone-warm)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>QUESTIONS</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "32px" }}>What people ask about church history</h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", textAlign: "left", padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer" }}
                  aria-expanded={openFaq === i}
                >
                  <span style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 400, color: "var(--ink)" }}>{item.question}</span>
                  <span style={{ fontFamily: "var(--U)", fontSize: "18px", color: "var(--ink-muted, #5A5448)", flexShrink: 0, marginLeft: "16px" }}>{openFaq === i ? "-" : "+"}</span>
                </button>
                {openFaq === i && (
                  <p style={{ fontFamily: "var(--U)", fontSize: "15px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, paddingBottom: "20px", maxWidth: "64ch" }}>
                    {item.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section style={{ background: "var(--charcoal)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--charcoal-fg)", marginBottom: "16px" }}>History that reads like theology</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "rgba(255,255,255,0.6)", marginBottom: "32px", lineHeight: 1.7 }}>Weekly essays on the full arc of Christianity. Where it came from. What went wrong. What still holds.</p>
          <LandingSignup source="landing-church-history" />
        </div>
      </section>

      {/* Next Step */}
      <section style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>KEEP READING</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "16px" }}>The full post-Christian series</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "52ch", marginLeft: "auto", marginRight: "auto" }}>
            Church history is the foundation. The full series covers sixty essays across seven tiers — from the collapse of Christendom to the questions that will define the next century of faith.
          </p>
          <Link href="/post-christian" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", border: "none", padding: "12px 28px", fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", borderRadius: "3px", cursor: "pointer" }}>Explore the Full Series</button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
