import { Link } from "wouter";
import { useState } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

/* ── data ─────────────────────────────────────────────────────────── */

const COMPARISONS = [
  {
    category: "Authority",
    orthodox: "Conciliar. The seven ecumenical councils (325-787 AD) are the highest doctrinal authority below Scripture. No single bishop holds universal jurisdiction. The Ecumenical Patriarch of Constantinople is 'first among equals' — a position of honor, not command.",
    catholic: "Papal. The Bishop of Rome holds universal jurisdiction over the entire church. When speaking ex cathedra on matters of faith and morals, the Pope is infallible (Vatican I, 1870). The Magisterium interprets Scripture and Tradition with binding authority.",
  },
  {
    category: "The Filioque",
    orthodox: "The Holy Spirit proceeds from the Father (John 15:26). The Western addition of 'and the Son' (filioque) to the Nicene Creed was unauthorized, theologically mistaken, and a violation of conciliar authority. This is not a minor point. It distorts the Trinity.",
    catholic: "The Holy Spirit proceeds from the Father and the Son (filioque). The addition was a theological clarification, not a contradiction. It was affirmed by local councils in the West before being added to the Creed. The theology is sound even if the process was contested.",
  },
  {
    category: "Worship",
    orthodox: "The Divine Liturgy. Primarily the Liturgy of St. John Chrysostom. Worship is mystical, sensory, and participatory — incense, icons, chanting, standing. The liturgy has remained essentially unchanged for over a thousand years. Time stops in the liturgy.",
    catholic: "The Mass. Post-Vatican II (1962-65), two forms exist: the Novus Ordo (ordinary form, in the vernacular) and the Traditional Latin Mass (extraordinary form). The Mass is structured around the Liturgy of the Word and the Liturgy of the Eucharist. It has evolved considerably.",
  },
  {
    category: "Salvation",
    orthodox: "Theosis — becoming partakers of the divine nature (2 Peter 1:4). Salvation is not primarily a legal transaction but a transformation. The goal of the Christian life is union with God. Athanasius: 'God became man so that man might become god.'",
    catholic: "Beatific Vision — the direct, face-to-face knowledge of God in heaven (1 Corinthians 13:12). Salvation involves justification (a real interior change), sanctification, and ultimately glorification. Aquinas systematized this. The goal is to see God as he is.",
  },
  {
    category: "Icons vs. Statues",
    orthodox: "Icons — two-dimensional depictions written (not painted) according to strict canons. Icons are windows to heaven, not decorations. They are venerated (kissed, processed, incensed). Three-dimensional statues are generally avoided — they are too physical, too Western.",
    catholic: "Statues and images. The Catholic tradition embraces both two-dimensional and three-dimensional sacred art. Statues of Mary, the saints, and the crucified Christ are central to Catholic devotion. The distinction between veneration and worship (latria vs. dulia) governs their use.",
  },
  {
    category: "Original Sin",
    orthodox: "Ancestral sin. Humanity inherits the consequences of Adam's fall — mortality, suffering, a weakened will — but not the personal guilt of Adam's sin. The Orthodox reject Augustine's formulation of inherited guilt.",
    catholic: "Original sin. Humanity inherits both the consequences and the guilt of Adam's fall. Baptism removes original sin. The Augustinian-Thomistic tradition defines original sin as the deprivation of original holiness and justice. The Immaculate Conception of Mary (1854) is the exception.",
  },
];

const HISTORICAL_TIMELINE = [
  { year: "325", label: "Council of Nicaea", desc: "The first ecumenical council. East and West are still one church. The Nicene Creed is written — without the filioque." },
  { year: "451", label: "Council of Chalcedon", desc: "Defines the two natures of Christ. The Oriental Orthodox (Coptic, Ethiopian, Armenian) break away. The fractures begin." },
  { year: "589", label: "The Filioque", desc: "The Council of Toledo adds 'and the Son' to the Creed. Rome eventually adopts it. Constantinople never does." },
  { year: "1054", label: "The Great Schism", desc: "Cardinal Humbert excommunicates the Patriarch of Constantinople. The Patriarch excommunicates the papal legates. The break is official." },
  { year: "1204", label: "The Fourth Crusade", desc: "Western crusaders sack Constantinople — a Christian city. They loot the churches, desecrate the altars, and install a Latin patriarch. The Orthodox have never forgotten this. Nor should they." },
  { year: "1964", label: "The Lifting of Anathemas", desc: "Pope Paul VI and Patriarch Athenagoras mutually lift the excommunications of 1054. A gesture. Not a reunion." },
];

const SHARED_GROUND = [
  "The first seven ecumenical councils (325-787 AD) — both accept the same Christological, Trinitarian, and Mariological definitions.",
  "The real presence of Christ in the Eucharist — both believe the bread and wine become the body and blood of Christ. The disagreement is over how to describe it (transubstantiation vs. mystery).",
  "Apostolic succession — both claim an unbroken chain of ordination from the apostles to the present. Both consider this essential, not optional.",
  "Seven sacraments (or mysteries, in Orthodox terminology) — Baptism, Chrismation/Confirmation, Eucharist, Confession, Anointing of the Sick, Holy Orders, and Marriage.",
  "Veneration of Mary — both honor Mary as Theotokos (God-bearer), ever-virgin, and assumed/dormitioned into heaven. The Catholic dogmas of the Immaculate Conception (1854) and papal infallibility (1870) are the sticking points.",
  "Liturgical worship — both traditions center their life on the Eucharist, observe the liturgical calendar, and maintain the cycle of daily prayer (the Hours).",
];

const RELATED_ARTICLES = [
  { title: "The Great Schism", slug: "the-great-schism" },
  { title: "The Orthodox Way", slug: "the-orthodox-way" },
  { title: "The Catholic Intellectual Tradition", slug: "the-catholic-intellectual-tradition" },
  { title: "The Rise and Fall of Christendom", slug: "the-rise-and-fall-of-christendom" },
  { title: "When the Church Married Empire", slug: "when-church-married-empire" },
];

const FAQ_ITEMS = [
  {
    question: "Could the Orthodox and Catholic churches reunite?",
    answer: "Theologically, the gap is narrower than many assume. The filioque could be resolved with careful trinitarian language. The real obstacle is papal authority. The Orthodox will never accept universal jurisdiction as Vatican I defined it. The Catholic Church cannot abandon it without undermining its own self-understanding. Reunion would require Rome to redefine the papacy — or Constantinople to accept a version of it that no Orthodox theologian currently finds acceptable.",
  },
  {
    question: "What happened in 1204?",
    answer: "The Fourth Crusade, originally directed at Muslim-held Jerusalem, was diverted to Constantinople. Western crusaders breached the walls of the greatest Christian city in the world, looted its churches, smashed its icons, and installed a Latin patriarch on the throne of an Orthodox see. It was Christians attacking Christians under the banner of the cross. The event permanently poisoned East-West relations and made the schism of 1054 irreversible in practice.",
  },
  {
    question: "What is theosis?",
    answer: "Theosis (divinization, deification) is the Orthodox understanding of salvation as participation in the divine nature. It does not mean humans become God in essence — that would be heresy. It means humans are transformed by grace to share in God's life, energy, and holiness. The distinction between God's essence (unknowable) and God's energies (participable) is central to Orthodox theology and has no real equivalent in Western thought.",
  },
  {
    question: "Why do Orthodox churches use icons instead of statues?",
    answer: "Icons are theology in color. They are 'written' according to strict canons that encode doctrinal meaning — the posture, colors, and composition all communicate theological truths. The two-dimensional form is deliberate: icons are windows into the heavenly realm, not imitations of earthly reality. Statues, in the Orthodox view, are too naturalistic — they pull the viewer toward the physical rather than through the physical to the divine. The theology of the icon was definitively settled at the Seventh Ecumenical Council (787).",
  },
  {
    question: "Which is older?",
    answer: "Both claim to be the original church Christ founded. Both have continuous institutional existence from the first century. The honest answer is that they are the same church that divided — like two branches growing from one trunk. Asking which is older is like asking which twin is the real child of the parents. The question itself is malformed.",
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
  name: "Orthodox vs. Catholic: What's the Difference?",
  description: "A detailed comparison of Eastern Orthodox and Roman Catholic Christianity — the Filioque, papal authority, theosis, icons, and the 1054 schism that divided the Christian world.",
  url: "https://www.livewellbyjamesbell.co/compare/orthodox-vs-catholic",
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

export default function OrthodoxVsCatholic() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      <SEOMeta
        title="Orthodox vs. Catholic: What's the Difference? | LiveWell"
        description="A detailed comparison of Eastern Orthodox and Roman Catholic Christianity — the Filioque, papal authority, theosis, icons, and the 1054 schism that divided the Christian world."
        keywords="Orthodox vs Catholic, Eastern Orthodox, Roman Catholic, Great Schism, Filioque, theosis, papal authority, icons, Divine Liturgy, 1054"
        structuredData={[faqSchema, webPageSchema]}
      />

      {/* Hero */}
      <section style={S.hero}>
        <p style={S.eyebrow}>COMPARISON</p>
        <h1 style={S.h1}>Orthodox vs. Catholic</h1>
        <p style={S.heroSub}>
          One church became two in 1054. The theological differences are real but narrow. The historical wound is deep and unhealed. The sack of Constantinople in 1204 made sure of that.
        </p>
      </section>

      {/* Comparison Table */}
      <section style={S.sectionBone}>
        <div style={S.wrap}>
          <p style={S.eyebrow}>POINT BY POINT</p>
          <h2 style={S.h2}>Where they diverge</h2>
          <p style={S.bodyText}>These are the oldest Christian traditions in the world. Their similarities dwarf their differences — and yet the differences have kept them apart for nearly a thousand years.</p>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="compare-header-desktop" style={{ display: "grid", gridTemplateColumns: "160px 1fr 1fr", gap: "0", borderBottom: "2px solid var(--mustard)" }}>
              <div style={{ padding: "16px 16px 16px 0" }}></div>
              <div style={{ padding: "16px", fontFamily: "var(--U)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-muted)", fontWeight: 600 }}>Orthodox</div>
              <div style={{ padding: "16px", fontFamily: "var(--U)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-muted)", fontWeight: 600 }}>Catholic</div>
            </div>
            {COMPARISONS.map((row, i) => (
              <div key={i}>
                <div className="compare-row-desktop" style={{ display: "grid", gridTemplateColumns: "160px 1fr 1fr", gap: "0", borderBottom: "1px solid var(--bone-muted)" }}>
                  <div style={{ padding: "20px 16px 20px 0", fontFamily: "var(--F)", fontSize: "18px", fontWeight: 500, color: "var(--ink)" }}>{row.category}</div>
                  <div style={{ padding: "20px 16px", fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", lineHeight: 1.65, borderLeft: "1px solid var(--bone-muted)" }}>{row.orthodox}</div>
                  <div style={{ padding: "20px 16px", fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", lineHeight: 1.65, borderLeft: "1px solid var(--bone-muted)" }}>{row.catholic}</div>
                </div>
                <div className="compare-card-mobile" style={{ display: "none" }}>
                  <div style={{ background: "var(--card)", border: "1px solid var(--bone-muted)", marginBottom: "16px", padding: "24px" }}>
                    <p style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 500, color: "var(--ink)", marginBottom: "16px", borderBottom: "2px solid var(--mustard)", paddingBottom: "12px" }}>{row.category}</p>
                    <p style={{ fontFamily: "var(--U)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--mustard)", fontWeight: 600, marginBottom: "8px" }}>Orthodox</p>
                    <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", lineHeight: 1.65, marginBottom: "20px" }}>{row.orthodox}</p>
                    <p style={{ fontFamily: "var(--U)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--mustard)", fontWeight: 600, marginBottom: "8px" }}>Catholic</p>
                    <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", lineHeight: 1.65 }}>{row.catholic}</p>
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

      {/* Historical Timeline */}
      <section style={S.sectionWarm}>
        <div style={S.wrapNarrow}>
          <p style={S.eyebrow}>THE SPLIT</p>
          <h2 style={S.h2}>How one church became two</h2>
          <p style={S.bodyText}>The schism did not happen in a day. It was centuries of divergence, punctuated by moments of formal rupture. The wound of 1054 was deepened by the betrayal of 1204.</p>
          <div style={{ position: "relative", paddingLeft: "32px" }}>
            <div style={{ position: "absolute", left: "7px", top: "8px", bottom: "8px", width: "2px", background: "var(--bone-muted)" }} />
            {HISTORICAL_TIMELINE.map((event, i) => (
              <div key={i} style={{ position: "relative", marginBottom: i < HISTORICAL_TIMELINE.length - 1 ? "28px" : "0" }}>
                <div style={{ position: "absolute", left: "-32px", top: "6px", width: "16px", height: "16px", borderRadius: "50%", background: event.year === "1054" || event.year === "1204" ? "var(--mustard)" : "var(--bone-muted)", border: "3px solid var(--bone-warm)" }} />
                <p style={{ fontFamily: "var(--U)", fontSize: "12px", letterSpacing: "0.1em", color: "var(--mustard)", marginBottom: "4px", fontWeight: 500 }}>{event.year}</p>
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
          <h2 style={S.h2}>What they share (and it is enormous)</h2>
          <p style={S.bodyText}>These traditions are closer to each other than either is to Protestantism. The shared inheritance includes the councils, the sacraments, the liturgy, and the conviction that the church Christ founded is visible, institutional, and apostolic.</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {SHARED_GROUND.map((item, i) => (
              <div key={i} style={{ padding: "16px 0", borderBottom: "1px solid rgba(0,0,0,0.08)", display: "flex", gap: "16px", alignItems: "baseline" }}>
                <span style={{ fontFamily: "var(--U)", fontSize: "12px", color: "var(--mustard)", fontWeight: 600, flexShrink: 0 }}>{String(i + 1).padStart(2, "0")}</span>
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
          <h2 style={S.h2}>The oldest wound</h2>
          <div style={{ fontFamily: "var(--U)", fontSize: "15px", color: "var(--ink-muted)", lineHeight: 1.75, maxWidth: "64ch" }}>
            <p style={{ marginBottom: "20px" }}>The Orthodox-Catholic schism is Christianity's oldest institutional wound. It predates the Reformation by five centuries. And unlike the Protestant-Catholic divide, it is not primarily about doctrine. It is about authority, history, and trust.</p>
            <p style={{ marginBottom: "20px" }}>The doctrinal differences — the filioque, the nature of original sin, the mechanism of salvation — are real but potentially resolvable. The authority question is not. The Orthodox cannot accept a bishop who claims universal jurisdiction over all Christians. Rome cannot surrender that claim without ceasing to be Rome.</p>
            <p style={{ marginBottom: "20px" }}>What makes the relationship tragic is how close these traditions are. They share more with each other than either shares with any Protestant tradition. They recognize each other's sacraments. They read the same fathers. They pray the same psalms.</p>
            <p>The division is a scandal. And the scandal is that both sides know it.</p>
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
              <Link key={a.slug} href={`/writing/${a.slug}`} style={{ textDecoration: "none" }}>
                <div style={{ padding: "20px 0", borderBottom: "1px solid rgba(0,0,0,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 400, color: "var(--ink)" }}>{a.title}</span>
                  <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--mustard)" }}>Read</span>
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
          <p style={S.bodyTextWhite}>Sixty essays tracing every major tradition, fracture, and turning point in the history of Christianity. The Orthodox-Catholic schism is where it begins.</p>
          <Link href="/post-christian" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--bone)", color: "var(--ink)", border: "none", padding: "14px 28px", fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", borderRadius: "2px", cursor: "pointer", borderBottom: "2px solid var(--mustard)" }}>Explore the Series</button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
