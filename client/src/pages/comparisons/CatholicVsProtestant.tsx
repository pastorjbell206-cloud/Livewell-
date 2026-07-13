import { Link } from "wouter";
import { useState } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { SITE_URL } from "@/lib/site";

/* ── data ─────────────────────────────────────────────────────────── */

const COMPARISONS = [
  {
    category: "Authority",
    catholic: "Pope and Magisterium. The teaching office of the church, guided by the Holy Spirit, interprets Scripture and Tradition together. The Pope speaks infallibly on matters of faith and morals (Vatican I, 1870).",
    protestant: "Sola Scriptura. Scripture alone is the final authority. No church office or tradition stands above it. Individual believers and congregations interpret the Bible under the Spirit's guidance.",
  },
  {
    category: "Salvation",
    catholic: "Faith formed by love, expressed through the sacraments. Justification is a process — initial grace received at baptism, sustained through the Eucharist, restored through confession. Works cooperate with grace (Council of Trent, 1545).",
    protestant: "Sola Fide. Faith alone, received as a gift, not earned. Justification is a declaration — God counts the sinner righteous because of Christ's finished work. Good works are the fruit of salvation, not its cause (Luther, Calvin, the Reformers).",
  },
  {
    category: "Sacraments",
    catholic: "Seven sacraments: Baptism, Eucharist, Confirmation, Confession (Reconciliation), Anointing of the Sick, Holy Orders, and Matrimony. Each conveys real grace. They are not symbols.",
    protestant: "Two ordinances (or sacraments, depending on the tradition): Baptism and the Lord's Supper. Most Protestants see them as outward signs of inward grace, not grace-conveying in themselves. Quakers observe none.",
  },
  {
    category: "Worship",
    catholic: "The Mass. A liturgical re-presentation of Christ's sacrifice. The Eucharist is the center — the bread and wine become the body and blood of Christ (transubstantiation). The liturgical calendar governs the year.",
    protestant: "Varies enormously. High-church Anglicans and Lutherans retain formal liturgy. Baptists and Pentecostals center on preaching and singing. The sermon, not the table, is typically the focal point.",
  },
  {
    category: "Mary & the Saints",
    catholic: "Mary is the Theotokos (Mother of God), ever-virgin, assumed bodily into heaven. Saints are venerated (not worshipped) as intercessors. The church recognizes their heroic virtue through canonization.",
    protestant: "Mary is honored as the mother of Jesus but given no special intercessory role. Saints are all believers (Ephesians 1:1). No prayers to the dead. No canonization process. No veneration of relics.",
  },
  {
    category: "Church Structure",
    catholic: "Hierarchical. Pope, cardinals, bishops, priests, deacons. Apostolic succession — an unbroken chain from Peter to the present pope. The church is visible, institutional, and universal.",
    protestant: "Varies. Episcopal (bishops), presbyterian (elders), congregational (the local body governs itself). No single structure unites all Protestants. The invisible church — all true believers — matters more than institutional form.",
  },
];

const SHARED_GROUND = [
  "The Nicene Creed (325 AD) — both affirm the Trinity, the incarnation, the resurrection, and the return of Christ.",
  "The authority of Scripture — the disagreement is over whether Scripture stands alone or alongside Sacred Tradition.",
  "The centrality of grace — Catholics and Protestants agree that salvation is by grace. The dispute is over how grace operates.",
  "The moral law — the Ten Commandments, the Sermon on the Mount, the call to love God and neighbor.",
  "The Great Commission — both traditions send missionaries, plant churches, and take evangelism seriously.",
  "The 1999 Joint Declaration on the Doctrine of Justification — Lutherans and Catholics officially agreed that the condemnations of the Reformation era no longer apply to each other's teaching on justification.",
];

const RELATED_ARTICLES = [
  { title: "The Reformation and Its Consequences", slug: "the-reformation-and-its-consequences" },
  { title: "The Catholic Intellectual Tradition", slug: "the-catholic-intellectual-tradition" },
  { title: "The Rise and Fall of Christendom", slug: "the-rise-and-fall-of-christendom" },
  { title: "The Enlightenment and the Crisis of Authority", slug: "the-enlightenment-and-the-crisis-of-authority" },
  { title: "Christianity in a Post-Christian Age", slug: "christianity-in-a-post-christian-age" },
];

const FAQ_ITEMS = [
  {
    question: "Can Catholics and Protestants worship together?",
    answer: "They can and do, in many contexts. Joint prayer services, community events, and ecumenical gatherings happen regularly. The sticking point is the Eucharist: the Catholic Church practices closed communion, meaning non-Catholics cannot receive the Eucharist at Mass. This is not hostility. It is theological consistency — if the Eucharist is truly the body and blood of Christ, admitting those who deny that claim would be incoherent.",
  },
  {
    question: "Do Catholics worship Mary?",
    answer: "No. Catholic theology draws a sharp line between latria (worship, given to God alone) and dulia (veneration, given to saints) and hyperdulia (special veneration, given to Mary). The distinction matters. Whether Protestants find it convincing is another question, but the accusation of Mary-worship misrepresents official Catholic teaching.",
  },
  {
    question: "Why do Protestants have so many denominations?",
    answer: "Because Sola Scriptura, without a central teaching authority, produces interpretive disagreements. If every believer can read the Bible and follow their conscience, sincere Christians will reach different conclusions about baptism, church governance, spiritual gifts, and the end times. The diversity is the logical outcome of the Reformation's core principle.",
  },
  {
    question: "Is one side right and the other wrong?",
    answer: "Both traditions believe they are right — that is what it means to hold a theological conviction. The honest answer is that both carry real strengths and real blind spots. Catholicism preserves historical continuity, sacramental depth, and intellectual tradition. Protestantism preserves access to Scripture, the priesthood of believers, and the freedom of conscience. The question is not which is comfortable but which is true — and that requires reading, thinking, and praying with more seriousness than most people bring to it.",
  },
  {
    question: "What did the Reformation actually change?",
    answer: "Everything. The Reformation shattered the institutional unity of Western Christianity, produced new forms of worship, redefined the relationship between church and state, and eventually helped create the conditions for modern democracy, religious liberty, and — paradoxically — secularism. Luther nailed theses to a door. The aftershocks reshaped civilization.",
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
  name: "Catholic vs. Protestant: What's the Difference?",
  description: "An honest, detailed comparison of Catholic and Protestant Christianity — authority, salvation, sacraments, worship, and the ground they share.",
  url: "https://www.livewellbyjamesbell.co/compare/catholic-vs-protestant",
  author: { "@type": "Person", name: "James Bell", url: `${SITE_URL}/about` },
  publisher: { "@type": "Organization", name: "LiveWell by James Bell" },
};

/* ── styles ───────────────────────────────────────────────────────── */

const S = {
  hero: { background: "var(--charcoal)", padding: "clamp(80px,12vw,160px) 24px", textAlign: "center" as const },
  eyebrow: { fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--mustard)", marginBottom: "24px" },
  h1: { fontFamily: "var(--F)", fontSize: "clamp(32px,5vw,60px)", fontWeight: 400, color: "white", maxWidth: "780px", margin: "0 auto", lineHeight: 1.15, letterSpacing: "-0.02em" },
  heroSub: { fontFamily: "var(--U)", fontSize: "16px", color: "rgba(255,255,255,0.6)", marginTop: "32px", maxWidth: "600px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 },
  sectionBone: { background: "var(--bone)", padding: "80px 24px" },
  sectionWarm: { background: "var(--bone-warm)", padding: "80px 24px" },
  sectionDark: { background: "var(--charcoal)", padding: "80px 24px" },
  wrap: { maxWidth: "880px", margin: "0 auto" },
  wrapNarrow: { maxWidth: "720px", margin: "0 auto" },
  h2: { fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "16px" },
  h2White: { fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "white", marginBottom: "16px" },
  bodyText: { fontFamily: "var(--U)", fontSize: "15px", color: "var(--ink-muted)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "64ch" },
  bodyTextWhite: { fontFamily: "var(--U)", fontSize: "14px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "32px" },
};

/* ── component ────────────────────────────────────────────────────── */

export default function CatholicVsProtestant() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      <SEOMeta
        title="Catholic vs. Protestant: What's the Difference? | LiveWell"
        description="An honest, detailed comparison of Catholic and Protestant Christianity — authority, salvation, sacraments, worship, and the ground they share."
        keywords="Catholic vs Protestant, Catholicism, Protestantism, Reformation, sacraments, Sola Scriptura, Sola Fide, Catholic Protestant differences"
        structuredData={[faqSchema, webPageSchema]}
      />

      {/* Hero */}
      <section style={S.hero}>
        <p style={S.eyebrow}>COMPARISON</p>
        <h1 style={S.h1}>Catholic vs. Protestant</h1>
        <p style={S.heroSub}>
          The division that split Western Christianity in 1517 and never healed. Not because the differences are trivial — because they are not. And not because reconciliation is impossible — because the shared ground runs deeper than most people on either side admit.
        </p>
      </section>

      {/* Comparison Table */}
      <section style={S.sectionBone}>
        <div style={S.wrap}>
          <p style={S.eyebrow}>POINT BY POINT</p>
          <h2 style={S.h2}>Where they diverge</h2>
          <p style={S.bodyText}>Six categories that define the divide. Neither column is a caricature. Both represent what each tradition actually teaches at its best.</p>

          {/* Desktop table */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {/* Header row */}
            <div className="compare-row-desktop" style={{ display: "grid", gridTemplateColumns: "180px 1fr 1fr", gap: "0", borderBottom: "2px solid var(--mustard)" }}>
              <div style={{ padding: "16px 16px 16px 0", fontFamily: "var(--U)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-muted)", fontWeight: 600 }}></div>
              <div style={{ padding: "16px", fontFamily: "var(--U)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-muted)", fontWeight: 600 }}>Catholic</div>
              <div style={{ padding: "16px", fontFamily: "var(--U)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-muted)", fontWeight: 600 }}>Protestant</div>
            </div>
            {COMPARISONS.map((row, i) => (
              <div key={i}>
                {/* Desktop row */}
                <div className="compare-row-desktop" style={{ display: "grid", gridTemplateColumns: "180px 1fr 1fr", gap: "0", borderBottom: "1px solid var(--bone-muted)" }}>
                  <div style={{ padding: "20px 16px 20px 0", fontFamily: "var(--F)", fontSize: "18px", fontWeight: 500, color: "var(--ink)" }}>{row.category}</div>
                  <div style={{ padding: "20px 16px", fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", lineHeight: 1.65, borderLeft: "1px solid var(--bone-muted)" }}>{row.catholic}</div>
                  <div style={{ padding: "20px 16px", fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", lineHeight: 1.65, borderLeft: "1px solid var(--bone-muted)" }}>{row.protestant}</div>
                </div>
                {/* Mobile cards */}
                <div className="compare-card-mobile" style={{ display: "none" }}>
                  <div style={{ background: "var(--card)", border: "1px solid var(--bone-muted)", marginBottom: "16px", padding: "24px" }}>
                    <p style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 500, color: "var(--ink)", marginBottom: "16px", borderBottom: "2px solid var(--mustard)", paddingBottom: "12px" }}>{row.category}</p>
                    <p style={{ fontFamily: "var(--U)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--mustard-text)", fontWeight: 600, marginBottom: "8px" }}>Catholic</p>
                    <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", lineHeight: 1.65, marginBottom: "20px" }}>{row.catholic}</p>
                    <p style={{ fontFamily: "var(--U)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--mustard-text)", fontWeight: 600, marginBottom: "8px" }}>Protestant</p>
                    <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", lineHeight: 1.65 }}>{row.protestant}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <style>{`
            @media(max-width:768px){
              .compare-row-desktop{display:none!important}
              .compare-card-mobile{display:block!important}
            }
          `}</style>
        </div>
      </section>

      {/* What They Share */}
      <section style={S.sectionWarm}>
        <div style={S.wrapNarrow}>
          <p style={S.eyebrow}>COMMON GROUND</p>
          <h2 style={S.h2}>What they share (more than people think)</h2>
          <p style={S.bodyText}>The Reformation was a fracture inside a family, not a war between strangers. The shared inheritance is massive.</p>
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
      <section style={S.sectionBone}>
        <div style={S.wrapNarrow}>
          <p style={S.eyebrow}>HOW TO THINK ABOUT THIS</p>
          <h2 style={S.h2}>Which is right?</h2>
          <div style={{ fontFamily: "var(--U)", fontSize: "15px", color: "var(--ink-muted)", lineHeight: 1.75, maxWidth: "64ch" }}>
            <p style={{ marginBottom: "20px" }}>Both claim to be. That is the nature of theological conviction — if you did not believe your position was true, you would not hold it. The question is not which tradition makes you feel more comfortable. The question is which one you believe, after serious reading, is faithful to what Christ actually taught and what the apostles actually handed down.</p>
            <p style={{ marginBottom: "20px" }}>Catholicism offers continuity, institutional stability, sacramental depth, and an intellectual tradition that includes Augustine, Aquinas, and Newman. Protestantism offers direct access to Scripture, the freedom of conscience, the priesthood of all believers, and a willingness to reform when reform is needed.</p>
            <p style={{ marginBottom: "20px" }}>The honest person reads both. The lazy person picks the one that costs the least. The courageous person asks which demands the most of them and follows the evidence wherever it leads.</p>
            <p>The worst thing either side can do is caricature the other. And both sides do it constantly.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={S.sectionWarm}>
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
      <section style={S.sectionBone}>
        <div style={S.wrapNarrow}>
          <p style={S.eyebrow}>KEEP READING</p>
          <h2 style={S.h2}>Go deeper</h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {RELATED_ARTICLES.map((a) => (
              <Link key={a.slug} href={`/writing/${a.slug}`} style={{ textDecoration: "none" }}>
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
          <p style={S.bodyTextWhite}>Sixty essays on the traditions, fractures, and questions that define Christianity today. This comparison is one piece. The series is the whole picture.</p>
          <Link href="/post-christian" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--bone)", color: "var(--ink)", border: "none", padding: "14px 28px", fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", borderRadius: "2px", cursor: "pointer", borderBottom: "2px solid var(--mustard)" }}>Explore the Series</button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
