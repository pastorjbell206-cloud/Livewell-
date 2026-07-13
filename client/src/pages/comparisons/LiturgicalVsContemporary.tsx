import { Link } from "wouter";
import { useState } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

/* ── data ─────────────────────────────────────────────────────────── */

const COMPARISONS = [
  {
    category: "Structure",
    liturgical: "Fixed order of worship. The service follows a pattern — call to worship, confession, Scripture readings (typically three: Old Testament, Epistle, Gospel), sermon, creed, prayers of the people, Eucharist, sending. The congregation knows what is coming and enters into it.",
    contemporary: "Flexible order of worship. The service is shaped by the worship team, the pastor, and the occasion. Typically: opening songs, welcome, worship set, sermon, response, closing. The structure adapts to the moment and the audience.",
  },
  {
    category: "Music",
    liturgical: "Hymns, psalms, choral works, organ. The music is handed down — some pieces are centuries old. The congregation sings together, often from a hymnal. The music serves the text. Charles Wesley, Isaac Watts, the Genevan Psalter. Bach is the summit.",
    contemporary: "Praise bands, projection screens, drums, electric guitars. The music is recent — most songs are less than twenty years old. The worship leader performs; the congregation follows. The music serves the experience. Chris Tomlin, Hillsong, Bethel, Elevation.",
  },
  {
    category: "Preaching",
    liturgical: "Typically shorter (15-25 minutes). The sermon is one element among many — it does not dominate the service. The lectionary provides the texts, which means the pastor does not choose the passage. The Word and the Table share the center.",
    contemporary: "Typically longer (30-50 minutes). The sermon is the main event. The pastor selects the text, usually preaching through a book or a topical series. The worship set builds toward the sermon. The Word is the center.",
  },
  {
    category: "Communion",
    liturgical: "Weekly or near-weekly. The Eucharist is the climax of worship, not an add-on. Christ is understood to be genuinely present in the bread and wine. The table is the place where heaven and earth meet.",
    contemporary: "Monthly, quarterly, or occasional. The Lord's Supper is observed but does not structure the service. It is typically understood as a memorial — remembering Christ's death, not receiving his presence. The sermon is the climax.",
  },
  {
    category: "Calendar",
    liturgical: "The liturgical year governs the rhythm. Advent, Christmas, Epiphany, Lent, Holy Week, Easter, Pentecost, Ordinary Time. The church lives inside the story of Christ's life, death, and resurrection — every year, the whole story.",
    contemporary: "The cultural calendar and sermon series govern the rhythm. Fall kickoff, Christmas Eve, Easter. Summer series. The church marks cultural moments (Mother's Day, Independence Day, Back to School) alongside the major Christian holidays.",
  },
  {
    category: "Formation",
    liturgical: "Worship forms you by repetition. You become what you pray. The fixed prayers, the creeds, the lectionary readings — they shape the imagination over decades. James K.A. Smith: liturgies are 'formative practices that train our hearts.'",
    contemporary: "Worship forms you by encounter. The emotional experience of meeting God in the moment — through a powerful song, a moving sermon, a prayer response — is the primary means of spiritual formation. The best services produce transformation.",
  },
];

const WORSHIP_WARS_CONTEXT = [
  {
    era: "The Historical Roots of Liturgical Worship",
    text: "The basic shape of Christian liturgy — Word and Table — dates to the second century (Justin Martyr, First Apology, c. 155 AD). The lectionary, the creeds, the fixed prayers: these are not traditions invented by medieval Catholics. They are the worship patterns of the early church, preserved for two thousand years.",
  },
  {
    era: "The Historical Roots of Contemporary Worship",
    text: "Contemporary worship descends from the revival tradition — frontier camp meetings, Charles Finney's 'new measures' (1830s), Billy Sunday's tabernacle services, the Jesus Movement (1960s-70s), and the Vineyard and Calvary Chapel movements. It is optimized for the unchurched visitor. It removes barriers to entry.",
  },
  {
    era: "The Worship Wars (1990s-2010s)",
    text: "The conflict peaked in the 1990s and 2000s as megachurches grew and mainline churches lost members. The question was never just about music. It was about what the church is for: Is worship a rehearsal of the gospel for the faithful, or an invitation to the gospel for the seeking? Both answers are partially right. Neither is sufficient alone.",
  },
];

const SHARED_GROUND = [
  "Both are trying to worship the same God. The disagreement is over method, not object. Liturgical Christians and contemporary Christians confess the same Christ and read the same Scriptures.",
  "Both have strengths the other needs. Liturgical worship offers depth, historical continuity, and formation over time. Contemporary worship offers accessibility, emotional engagement, and cultural relevance.",
  "Both can be done badly. A liturgical service can be cold, rote, and spiritually dead. A contemporary service can be shallow, emotionally manipulative, and theologically thin. The form does not guarantee the substance.",
  "Both are moving toward each other. Many contemporary churches are adopting elements of liturgy (the Apostles' Creed, Advent candles, Ash Wednesday). Many liturgical churches are incorporating contemporary music and casual atmospheres. The blended model is the growing edge.",
  "Both produce genuine Christians. The measure of worship is not the style. It is whether the people who practice it become more like Christ over time.",
];

const RELATED_ARTICLES = [
  { title: "The Evangelical Movement", href: "/theology/history/the-awakenings" },
  { title: "The Pentecostal Explosion", href: "/theology/history/the-global-church" },
  { title: "The Mainline Protestant Collapse", href: "/writing/the-numbers-behind-the-decline" },
  { title: "The Orthodox Way", href: "/theology/history/the-church-that-outlived-rome" },
  { title: "Christianity in a Post-Christian Age", href: "/writing/the-church-after-cultural-power" },
];

const FAQ_ITEMS = [
  {
    question: "Why are young people moving toward liturgy?",
    answer: "Several converging factors. A generation raised on screens craves embodied experience — incense, candles, kneeling, physical bread and wine. A generation raised on novelty craves permanence — prayers that have been prayed for centuries feel more substantial than songs released last year. A generation raised in consumer culture is suspicious of worship that feels like a product. And a generation that grew up in contemporary churches sometimes discovers that the emotional high fades but the liturgy remains. The movement is not massive, but it is real and it is revealing.",
  },
  {
    question: "Is contemporary worship biblical?",
    answer: "The New Testament does not prescribe a worship format. The early church gathered for the apostles' teaching, fellowship, breaking of bread, and prayer (Acts 2:42). Within a generation, that developed into the Word-and-Table structure that liturgical churches preserve. Contemporary worship's informality is not anti-biblical, but it is historically novel — the first nineteen centuries of Christianity would not recognize it. That does not make it wrong. But it should make its practitioners more humble about claiming biblical warrant.",
  },
  {
    question: "What is the blended model?",
    answer: "A service that combines liturgical elements (creeds, responsive readings, the lectionary, weekly communion) with contemporary elements (a worship band, projection screens, casual atmosphere). It attempts to hold depth and accessibility together. The risk is that it does neither well — too formal for seekers, too informal for the liturgically formed. The promise is that it takes the best of both traditions and refuses to choose. Many of the healthiest churches are quietly doing this.",
  },
  {
    question: "Does worship style affect what you believe?",
    answer: "Yes. Lex orandi, lex credendi — the law of prayer is the law of belief. What you sing shapes what you believe. A church that sings 'In Christ Alone' every month will hold penal substitutionary atonement. A church that sings 'All Are Welcome' every month will prioritize inclusion. A church that recites the Nicene Creed weekly will hold trinitarian orthodoxy even when individual members doubt it. Worship is not a neutral container. It is a catechism.",
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
  name: "Liturgical vs. Contemporary Worship: What's the Difference?",
  description: "A detailed comparison of liturgical and contemporary worship — what each offers, what each costs, the worship wars, and why young people are moving toward liturgy.",
  url: "https://www.livewellbyjamesbell.co/compare/liturgical-vs-contemporary",
  author: { "@type": "Person", name: "James Bell", url: "https://www.livewellbyjamesbell.co/about" },
  publisher: { "@type": "Organization", name: "LiveWell by James Bell" },
};

/* ── styles ───────────────────────────────────────────────────────── */

const S = {
  hero: { background: "var(--charcoal)", padding: "clamp(80px,12vw,160px) 24px", textAlign: "center" as const },
  eyebrow: { fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--mustard)", marginBottom: "24px" },
  h1: { fontFamily: "var(--F)", fontSize: "clamp(32px,5vw,60px)", fontWeight: 400, color: "white", maxWidth: "780px", margin: "0 auto", lineHeight: 1.15, letterSpacing: "-0.02em" },
  heroSub: { fontFamily: "var(--U)", fontSize: "16px", color: "rgba(255,255,255,0.6)", marginTop: "32px", maxWidth: "620px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 },
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

export default function LiturgicalVsContemporary() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      <SEOMeta
        title="Liturgical vs. Contemporary Worship: What's the Difference? | LiveWell"
        description="A detailed comparison of liturgical and contemporary worship — what each offers, what each costs, the worship wars, and why young people are moving toward liturgy."
        keywords="liturgical vs contemporary worship, worship wars, traditional worship, modern worship, hymns vs praise songs, liturgy, Eucharist, worship style, church music"
        structuredData={[faqSchema, webPageSchema]}
      />

      {/* Hero */}
      <section style={S.hero}>
        <p style={S.eyebrow}>COMPARISON</p>
        <h1 style={S.h1}>Liturgical vs. Contemporary Worship</h1>
        <p style={S.heroSub}>
          One tradition hands you a prayer book. The other hands you a setlist. The question is not which one you prefer. The question is what kind of Christian each one produces over thirty years.
        </p>
      </section>

      {/* Comparison Table */}
      <section style={S.sectionBone}>
        <div style={S.wrap}>
          <p style={S.eyebrow}>POINT BY POINT</p>
          <h2 style={S.h2}>What each offers and what each costs</h2>
          <p style={S.bodyText}>Six categories. Neither column is the villain. Both have real gifts and real costs. The honest assessment refuses to pretend otherwise.</p>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="compare-header-desktop" style={{ display: "grid", gridTemplateColumns: "160px 1fr 1fr", gap: "0", borderBottom: "2px solid var(--mustard)" }}>
              <div style={{ padding: "16px 16px 16px 0" }}></div>
              <div style={{ padding: "16px", fontFamily: "var(--U)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-muted)", fontWeight: 600 }}>Liturgical</div>
              <div style={{ padding: "16px", fontFamily: "var(--U)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-muted)", fontWeight: 600 }}>Contemporary</div>
            </div>
            {COMPARISONS.map((row, i) => (
              <div key={i}>
                <div className="compare-row-desktop" style={{ display: "grid", gridTemplateColumns: "160px 1fr 1fr", gap: "0", borderBottom: "1px solid var(--bone-muted)" }}>
                  <div style={{ padding: "20px 16px 20px 0", fontFamily: "var(--F)", fontSize: "18px", fontWeight: 500, color: "var(--ink)" }}>{row.category}</div>
                  <div style={{ padding: "20px 16px", fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", lineHeight: 1.65, borderLeft: "1px solid var(--bone-muted)" }}>{row.liturgical}</div>
                  <div style={{ padding: "20px 16px", fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", lineHeight: 1.65, borderLeft: "1px solid var(--bone-muted)" }}>{row.contemporary}</div>
                </div>
                <div className="compare-card-mobile" style={{ display: "none" }}>
                  <div style={{ background: "var(--card)", border: "1px solid var(--bone-muted)", marginBottom: "16px", padding: "24px" }}>
                    <p style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 500, color: "var(--ink)", marginBottom: "16px", borderBottom: "2px solid var(--mustard)", paddingBottom: "12px" }}>{row.category}</p>
                    <p style={{ fontFamily: "var(--U)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--mustard-text)", fontWeight: 600, marginBottom: "8px" }}>Liturgical</p>
                    <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", lineHeight: 1.65, marginBottom: "20px" }}>{row.liturgical}</p>
                    <p style={{ fontFamily: "var(--U)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--mustard-text)", fontWeight: 600, marginBottom: "8px" }}>Contemporary</p>
                    <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", lineHeight: 1.65 }}>{row.contemporary}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <style>{`
            @media(max-width:768px){
              .compare-row-desktop,.compare-header-desktop{display:none!important}
              .compare-card-mobile{display:block!important}
            }
          `}</style>
        </div>
      </section>

      {/* Historical Context */}
      <section style={S.sectionWarm}>
        <div style={S.wrapNarrow}>
          <p style={S.eyebrow}>THE ROOTS AND THE WARS</p>
          <h2 style={S.h2}>Where both came from and why they fought</h2>
          <p style={S.bodyText}>The worship wars were never just about music. They were about what the church is for, who it is trying to reach, and what it believes about how God forms people.</p>
          {WORSHIP_WARS_CONTEXT.map((section, i) => (
            <div key={i} style={{ marginBottom: i < WORSHIP_WARS_CONTEXT.length - 1 ? "32px" : "0" }}>
              <h3 style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 500, color: "var(--ink)", marginBottom: "12px" }}>{section.era}</h3>
              <p style={{ fontFamily: "var(--U)", fontSize: "15px", color: "var(--ink-muted)", lineHeight: 1.7, maxWidth: "64ch" }}>{section.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What They Share */}
      <section style={S.sectionBone}>
        <div style={S.wrapNarrow}>
          <p style={S.eyebrow}>COMMON GROUND</p>
          <h2 style={S.h2}>What they share</h2>
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
          <h2 style={S.h2}>The question behind the question</h2>
          <div style={{ fontFamily: "var(--U)", fontSize: "15px", color: "var(--ink-muted)", lineHeight: 1.75, maxWidth: "64ch" }}>
            <p style={{ marginBottom: "20px" }}>The real question is not whether you like hymns or praise songs. It is what you believe worship does. If worship is an encounter — a moment where the veil thins and you meet God — then the contemporary model makes sense. Remove barriers. Create atmosphere. Let the Spirit move.</p>
            <p style={{ marginBottom: "20px" }}>If worship is formation — a practice that shapes you into a particular kind of person over decades of repetition — then the liturgical model makes sense. Give the congregation words to pray when their own words fail. Let the lectionary take them through the whole counsel of God, not just their pastor's favorite passages.</p>
            <p style={{ marginBottom: "20px" }}>The best answer holds both. Worship should be both encounter and formation. The service should be accessible to the newcomer and deep enough for the saint who has been coming for forty years. Very few churches accomplish this. The ones that do are usually blended — not in the sense of splitting the difference, but in the sense of refusing to choose between depth and warmth.</p>
            <p>What you sing on Sunday morning will shape what you believe by Wednesday afternoon. Choose carefully.</p>
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
          <p style={S.bodyTextWhite}>Sixty essays on the traditions, fractures, and questions reshaping Christianity. How we worship is inseparable from what we believe.</p>
          <Link href="/post-christian" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--bone)", color: "var(--ink)", border: "none", padding: "14px 28px", fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", borderRadius: "2px", cursor: "pointer", borderBottom: "2px solid var(--mustard)" }}>Explore the Series</button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
