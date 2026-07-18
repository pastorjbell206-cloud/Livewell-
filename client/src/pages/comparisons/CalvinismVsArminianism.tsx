import { Link } from "wouter";
import { useState } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

/* ── data ─────────────────────────────────────────────────────────── */

const TULIP_COMPARISONS = [
  {
    letter: "T",
    label: "Total Depravity / Total Inability",
    calvinist: "Every part of human nature is corrupted by the fall. Humans cannot choose God apart from regenerating grace. The will is bound — not free in any spiritually meaningful sense (Romans 3:10-12, Ephesians 2:1-3).",
    arminian: "Humanity is fallen and unable to save itself, but God gives prevenient grace to every person — grace that precedes and enables the choice to believe. The will is freed by grace, not bypassed by it (John 1:9, Titus 2:11).",
  },
  {
    letter: "U",
    label: "Unconditional Election / Conditional Election",
    calvinist: "God chose, before the foundation of the world, who would be saved — not based on foreseen faith or merit but solely on his sovereign will. Election is unconditional (Ephesians 1:4-5, Romans 9:11-13).",
    arminian: "God elects based on foreknowledge of who will freely respond to the gospel. Election is conditional — it depends on a person's faith, which God foresees but does not cause (Romans 8:29, 1 Peter 1:1-2).",
  },
  {
    letter: "L",
    label: "Limited Atonement / Unlimited Atonement",
    calvinist: "Christ died specifically for the elect. The atonement is definite in its intent — it actually saves, rather than making salvation merely possible. If Christ died for everyone, everyone would be saved (John 10:11, 10:15).",
    arminian: "Christ died for all people without exception. The atonement is universal in scope but conditional in application — it is effective for those who believe (1 John 2:2, 2 Peter 3:9, 1 Timothy 2:4-6).",
  },
  {
    letter: "I",
    label: "Irresistible Grace / Resistible Grace",
    calvinist: "When God calls one of the elect, that call is effectual. The Holy Spirit overcomes all resistance and brings the person to faith. Grace is not a mere offer — it is a power that accomplishes what it intends (John 6:37, 6:44, Philippians 1:6).",
    arminian: "Grace can be resisted. God genuinely offers salvation to all and the Spirit works to draw people, but humans retain the ability to reject that work. God does not override human freedom (Acts 7:51, Matthew 23:37).",
  },
  {
    letter: "P",
    label: "Perseverance of the Saints / Conditional Perseverance",
    calvinist: "Those whom God has truly saved will persevere to the end. They cannot lose their salvation. If someone falls away permanently, they were never genuinely saved (John 10:28-29, Romans 8:38-39, 1 John 2:19).",
    arminian: "Believers can fall from grace through persistent, willful unbelief. Salvation is secure as long as one remains in Christ, but apostasy is a real possibility — otherwise the warnings in Scripture are meaningless (Hebrews 6:4-6, 2 Peter 2:20-22, Galatians 5:4).",
  },
];

const HISTORICAL_CONTEXT = [
  { year: "354-430", label: "Augustine of Hippo", desc: "Argued for predestination and the bondage of the will against Pelagius. Set the terms of the debate for the next 1,600 years." },
  { year: "1509-1564", label: "John Calvin", desc: "Systematized the theology of God's sovereignty in the Institutes. Geneva became the laboratory for Reformed Christianity." },
  { year: "1560-1609", label: "Jacobus Arminius", desc: "A Dutch Reformed theologian who questioned unconditional election. His followers codified his views in the Five Articles of Remonstrance (1610)." },
  { year: "1618-1619", label: "The Synod of Dort", desc: "The Reformed churches formally condemned Arminianism and articulated the five points (TULIP). The Remonstrants were expelled." },
  { year: "1703-1791", label: "John Wesley", desc: "Took Arminian theology and made it a movement. Methodism carried Arminianism to the masses. The revival changed England." },
  { year: "1703-1758", label: "Jonathan Edwards", desc: "America's greatest Calvinist mind. Freedom of the Will (1754) remains the most rigorous defense of compatibilism in the English language." },
];

const SHARED_GROUND = [
  "Both affirm the Trinity, the deity of Christ, and the authority of Scripture.",
  "Both believe salvation is by grace through faith — the dispute is over how grace operates, not whether it is necessary.",
  "Both affirm the reality of human sin and the inability of humans to save themselves apart from God's action.",
  "Both believe in the atoning death of Christ as the sole basis for salvation.",
  "Both confess that God is sovereign — Arminians do not deny sovereignty; they define it differently.",
  "Both traditions have produced saints, scholars, missionaries, and martyrs.",
];

const RELATED_ARTICLES = [
  { title: "The Reformation and Its Consequences", href: "/theology/history/the-reformation" },
  { title: "The Age of Revivals", href: "/theology/history/the-awakenings" },
  { title: "The Evangelical Movement", href: "/theology/history/the-awakenings" },
  { title: "The Enlightenment and the Crisis of Authority", href: "/writing/authority-we-traded-for-authenticity" },
];

const FAQ_ITEMS = [
  {
    question: "Was Calvin actually a Calvinist?",
    answer: "Not in the five-point sense. Calvin never used the TULIP acronym — that was a later systematization from the Synod of Dort (1618-1619), more than fifty years after his death. Calvin's theology was broader and more pastoral than the five points suggest. But the points do represent a fair distillation of his core convictions about God's sovereignty in salvation.",
  },
  {
    question: "What is Molinism?",
    answer: "A middle position developed by the Jesuit theologian Luis de Molina (1535-1600). Molinism holds that God has 'middle knowledge' — he knows what every free creature would do in every possible circumstance, and he uses that knowledge to arrange a world where his sovereign purposes are accomplished through genuinely free human choices. It is an attempt to preserve both divine sovereignty and human freedom without reducing either.",
  },
  {
    question: "Does this debate actually matter?",
    answer: "It changes how you pray. It changes how you evangelize. It changes how you read Romans 9. It changes what you say at a funeral. If God elects unconditionally, prayer is an act of submission to a plan already determined. If election is conditional, prayer is a genuine petition that can change outcomes. The theology is not abstract. It shapes the lived faith of every person who holds it.",
  },
  {
    question: "Which view does the Bible teach?",
    answer: "Both sides have strong biblical texts. Calvinists lean on Romans 9, Ephesians 1, and John 6. Arminians lean on 1 Timothy 2:4, 2 Peter 3:9, and the warning passages in Hebrews. The honest answer is that the Bible contains tensions on this subject that neither system fully resolves. If it were obvious, the debate would not have lasted 1,600 years.",
  },
  {
    question: "Can you be somewhere in the middle?",
    answer: "Most Christians are. The labels describe endpoints on a spectrum. Many hold to four points of Calvinism but reject limited atonement. Many Arminians affirm eternal security. The majority of churchgoing Christians have never heard of TULIP and hold instinctive positions that do not fit neatly into either camp. The systematizers on both sides will tell you that the middle is incoherent. The people in the middle will tell you that the systems are too tidy for a God who is not.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Calvinism vs. Arminianism: What's the Difference?",
  description: "A point-by-point TULIP comparison of Calvinism and Arminianism — historical context, the Scripture each side uses, and why this debate shapes how you pray and read the Bible.",
  url: "https://www.livewellbyjamesbell.co/compare/calvinism-vs-arminianism",
  author: { "@type": "Person", name: "James Bell", url: "https://www.livewellbyjamesbell.co/about" },
  publisher: { "@type": "Organization", name: "LiveWell by James Bell" },
};

/* ── styles ───────────────────────────────────────────────────────── */

const S = {
  hero: { background: "var(--charcoal)", padding: "clamp(80px,12vw,160px) 24px", textAlign: "center" as const },
  eyebrow: { fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--mustard)", marginBottom: "24px" },
  h1: { fontFamily: "var(--F)", fontSize: "clamp(32px,5vw,60px)", fontWeight: 400, color: "var(--charcoal-fg)", maxWidth: "780px", margin: "0 auto", lineHeight: 1.15, letterSpacing: "-0.02em" },
  heroSub: { fontFamily: "var(--U)", fontSize: "16px", color: "rgba(255,255,255,0.6)", marginTop: "32px", maxWidth: "600px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 },
  sectionBone: { background: "var(--bone)", padding: "80px 24px" },
  sectionWarm: { background: "var(--bone-warm)", padding: "80px 24px" },
  sectionDark: { background: "var(--charcoal)", padding: "80px 24px" },
  wrap: { maxWidth: "880px", margin: "0 auto" },
  wrapNarrow: { maxWidth: "720px", margin: "0 auto" },
  h2: { fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "16px" },
  h2White: { fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--charcoal-fg)", marginBottom: "16px" },
  bodyText: { fontFamily: "var(--U)", fontSize: "15px", color: "var(--ink-muted)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "64ch" },
  bodyTextWhite: { fontFamily: "var(--U)", fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "32px" },
};

/* ── component ────────────────────────────────────────────────────── */

export default function CalvinismVsArminianism() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      <SEOMeta
        title="Calvinism vs. Arminianism: What's the Difference? | LiveWell"
        description="A point-by-point TULIP comparison of Calvinism and Arminianism — historical context, the Scripture each side uses, and why this debate shapes how you pray and read the Bible."
        keywords="Calvinism vs Arminianism, TULIP, predestination, free will, election, Reformed theology, Wesleyan theology, Dort, Molinism"
        structuredData={[faqSchema, webPageSchema]}
      />

      {/* Hero */}
      <section style={S.hero}>
        <p style={S.eyebrow}>COMPARISON</p>
        <h1 style={S.h1}>Calvinism vs. Arminianism</h1>
        <p style={S.heroSub}>
          The oldest argument inside Protestantism. Does God choose you, or do you choose God? The answer changes how you pray, how you evangelize, and how you read the hardest chapters in your Bible.
        </p>
      </section>

      {/* TULIP Comparison */}
      <section style={S.sectionBone}>
        <div style={S.wrap}>
          <p style={S.eyebrow}>THE FIVE POINTS</p>
          <h2 style={S.h2}>TULIP: point by point</h2>
          <p style={S.bodyText}>The five points of Calvinism were formulated at the Synod of Dort (1618-1619) in response to the Arminian Remonstrance. Each point has a counter-position. Neither side is guessing.</p>

          {TULIP_COMPARISONS.map((row, i) => (
            <div key={i}>
              {/* Desktop */}
              <div className="tulip-row-desktop" style={{ display: "grid", gridTemplateColumns: "200px 1fr 1fr", gap: "0", borderBottom: i < TULIP_COMPARISONS.length - 1 ? "1px solid var(--bone-muted)" : "none", borderTop: i === 0 ? "2px solid var(--mustard)" : "none" }}>
                <div style={{ padding: "24px 16px 24px 0" }}>
                  <span style={{ fontFamily: "var(--F)", fontSize: "32px", fontWeight: 400, color: "var(--mustard-text)", display: "block", lineHeight: 1 }}>{row.letter}</span>
                  <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 500, color: "var(--ink)", marginTop: "4px", display: "block" }}>{row.label}</span>
                </div>
                <div style={{ padding: "24px 16px", fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", lineHeight: 1.65, borderLeft: "1px solid var(--bone-muted)" }}>
                  <span style={{ fontFamily: "var(--U)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--mustard-text)", fontWeight: 600, display: "block", marginBottom: "8px" }}>Calvinist</span>
                  {row.calvinist}
                </div>
                <div style={{ padding: "24px 16px", fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", lineHeight: 1.65, borderLeft: "1px solid var(--bone-muted)" }}>
                  <span style={{ fontFamily: "var(--U)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--mustard-text)", fontWeight: 600, display: "block", marginBottom: "8px" }}>Arminian</span>
                  {row.arminian}
                </div>
              </div>
              {/* Mobile card */}
              <div className="tulip-card-mobile" style={{ display: "none" }}>
                <div style={{ background: "var(--card)", border: "1px solid var(--bone-muted)", marginBottom: "16px", padding: "24px" }}>
                  <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "16px", borderBottom: "2px solid var(--mustard)", paddingBottom: "12px" }}>
                    <span style={{ fontFamily: "var(--F)", fontSize: "32px", fontWeight: 400, color: "var(--mustard-text)" }}>{row.letter}</span>
                    <span style={{ fontFamily: "var(--F)", fontSize: "18px", fontWeight: 500, color: "var(--ink)" }}>{row.label}</span>
                  </div>
                  <p style={{ fontFamily: "var(--U)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--mustard-text)", fontWeight: 600, marginBottom: "8px" }}>Calvinist</p>
                  <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", lineHeight: 1.65, marginBottom: "20px" }}>{row.calvinist}</p>
                  <p style={{ fontFamily: "var(--U)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--mustard-text)", fontWeight: 600, marginBottom: "8px" }}>Arminian</p>
                  <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", lineHeight: 1.65 }}>{row.arminian}</p>
                </div>
              </div>
            </div>
          ))}
          <style>{`
            @media(max-width:768px){
              .tulip-row-desktop{display:none!important}
              .tulip-card-mobile{display:block!important}
            }
          `}</style>
        </div>
      </section>

      {/* Historical Context */}
      <section style={S.sectionWarm}>
        <div style={S.wrapNarrow}>
          <p style={S.eyebrow}>HISTORY</p>
          <h2 style={S.h2}>The people behind the positions</h2>
          <p style={S.bodyText}>This is not an abstract debate. Real people staked their lives and careers on it. The timeline matters.</p>
          <div style={{ position: "relative", paddingLeft: "32px" }}>
            <div style={{ position: "absolute", left: "7px", top: "8px", bottom: "8px", width: "2px", background: "var(--bone-muted)" }} />
            {HISTORICAL_CONTEXT.map((event, i) => (
              <div key={i} style={{ position: "relative", marginBottom: i < HISTORICAL_CONTEXT.length - 1 ? "28px" : "0" }}>
                <div style={{ position: "absolute", left: "-32px", top: "6px", width: "16px", height: "16px", borderRadius: "50%", background: i === HISTORICAL_CONTEXT.length - 1 ? "var(--mustard)" : "var(--bone-muted)", border: "3px solid var(--bone-warm)" }} />
                <p style={{ fontFamily: "var(--U)", fontSize: "12px", letterSpacing: "0.1em", color: "var(--mustard-text)", marginBottom: "4px", fontWeight: 500 }}>{event.year}</p>
                <p style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 400, color: "var(--ink)", marginBottom: "4px" }}>{event.label}</p>
                <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", lineHeight: 1.6 }}>{event.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What They Share */}
      <section style={S.sectionBone}>
        <div style={S.wrapNarrow}>
          <p style={S.eyebrow}>COMMON GROUND</p>
          <h2 style={S.h2}>Where they agree</h2>
          <p style={S.bodyText}>The argument is inside the family. Both sides confess the same Christ, the same Scriptures, and the same gospel. The dispute is over the mechanism, not the message.</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {SHARED_GROUND.map((item, i) => (
              <div key={i} style={{ padding: "16px 0", borderBottom: "1px solid rgba(0,0,0,0.08)", display: "flex", gap: "16px", alignItems: "baseline" }}>
                <span style={{ fontFamily: "var(--U)", fontSize: "12px", color: "var(--mustard-text)", fontWeight: 600, flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
                <p style={{ fontFamily: "var(--U)", fontSize: "15px", color: "var(--ink-muted)", lineHeight: 1.65 }}>{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Think About This */}
      <section style={S.sectionWarm}>
        <div style={S.wrapNarrow}>
          <p style={S.eyebrow}>HOW TO THINK ABOUT THIS</p>
          <h2 style={S.h2}>Why it matters for how you live</h2>
          <div style={{ fontFamily: "var(--U)", fontSize: "15px", color: "var(--ink-muted)", lineHeight: 1.75, maxWidth: "64ch" }}>
            <p style={{ marginBottom: "20px" }}>If Calvinism is right, evangelism is announcing what God has already decided. If Arminianism is right, evangelism is a genuine plea that can be refused. Both motivations produce missionaries. But they produce different postures toward the person across the table.</p>
            <p style={{ marginBottom: "20px" }}>If Calvinism is right, assurance of salvation rests on the unshakable decree of God. If Arminianism is right, assurance rests on a living relationship that can be abandoned. Both produce Christians. But they produce different kinds of anxiety and different kinds of rest.</p>
            <p style={{ marginBottom: "20px" }}>The mature position is not to pretend the debate does not matter. It is to hold your conviction with intellectual honesty while acknowledging that the other side has reasons — real ones, biblical ones — for what they believe.</p>
            <p>The Bible contains both Romans 9 and 2 Peter 3:9. A theology that accounts for only one of them is not a theology. It is an editorial decision.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={S.sectionBone}>
        <div style={S.wrapNarrow}>
          <p style={S.eyebrow}>QUESTIONS</p>
          <h2 style={S.h2}>What people ask</h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", textAlign: "left", padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer" }}
                  aria-expanded={openFaq === i}
                >
                  <span style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 400, color: "var(--ink)" }}>{item.question}</span>
                  <span style={{ fontFamily: "var(--U)", fontSize: "18px", color: "var(--ink-muted)", flexShrink: 0, marginLeft: "16px" }}>{openFaq === i ? "−" : "+"}</span>
                </button>
                {openFaq === i && (
                  <p style={{ fontFamily: "var(--U)", fontSize: "15px", color: "var(--ink-muted)", lineHeight: 1.7, paddingBottom: "20px", maxWidth: "64ch" }}>
                    {item.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related Articles */}
      <section style={S.sectionWarm}>
        <div style={S.wrapNarrow}>
          <p style={S.eyebrow}>KEEP READING</p>
          <h2 style={S.h2}>Go deeper</h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {RELATED_ARTICLES.map((a) => (
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

      {/* CTA */}
      <section style={S.sectionDark}>
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={S.h2White}>The full post-Christian series</h2>
          <p style={S.bodyTextWhite}>Sixty essays on the traditions, fractures, and questions that define Christianity today. Calvinism and Arminianism are one fault line. The series maps them all.</p>
          <Link href="/post-christian" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--bone)", color: "var(--ink)", border: "none", padding: "14px 28px", fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", borderRadius: "2px", cursor: "pointer", borderBottom: "2px solid var(--mustard)" }}>Explore the Series</button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
