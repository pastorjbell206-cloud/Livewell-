import { Link } from "wouter";
import { useState } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

/* ── data ─────────────────────────────────────────────────────────── */

const COMPARISONS = [
  {
    category: "Baptism",
    baptist: "Believer's baptism only. Baptism follows a conscious profession of faith. Infants are dedicated, not baptized. Immersion is the standard mode — it pictures death, burial, and resurrection with Christ (Romans 6:3-4).",
    methodist: "Infant baptism and believer's baptism. Baptism is a means of grace, not merely a symbol. Infants are baptized into the covenant community. Sprinkling, pouring, and immersion are all valid modes.",
  },
  {
    category: "Governance",
    baptist: "Congregational. Each local church is autonomous — self-governing, self-supporting, self-propagating. No bishop or denominational body can overrule the congregation. The Southern Baptist Convention is a cooperative, not a hierarchy.",
    methodist: "Connectional. Churches are linked through a structure of conferences (local, district, annual, general). Bishops appoint pastors. The denomination functions as one body with centralized decision-making.",
  },
  {
    category: "Theology",
    baptist: "Ranges from strongly Reformed (Particular Baptists, many SBC churches) to broadly evangelical. The Baptist Faith and Message (2000) emphasizes biblical inerrancy, substitutionary atonement, and eternal security of the believer.",
    methodist: "Wesleyan-Arminian. Emphasizes prevenient grace (grace that precedes conversion), personal holiness, and sanctification as an ongoing process. The Wesleyan quadrilateral (Scripture, tradition, reason, experience) guides theological reflection.",
  },
  {
    category: "Social Engagement",
    baptist: "Varied. Historically ranged from separatist (Roger Williams) to activist (Martin Luther King Jr. was a Baptist minister). The SBC has been culturally conservative since the conservative resurgence of the 1980s.",
    methodist: "Historically activist. The Social Creed (1908) committed Methodists to labor rights, poverty relief, and systemic reform. Wesley himself opened free clinics, started schools, and opposed slavery before it was popular to do so.",
  },
  {
    category: "Worship Style",
    baptist: "Typically centered on the sermon. Worship ranges from traditional hymns (especially in rural and Southern churches) to contemporary praise bands (especially in megachurches). No fixed liturgy. No lectionary requirement.",
    methodist: "More structured. Many Methodist churches follow the Revised Common Lectionary and observe the liturgical calendar. Hymnody is central — Charles Wesley wrote over 6,000 hymns. Contemporary worship is growing but not universal.",
  },
  {
    category: "Lord's Supper",
    baptist: "An ordinance (not a sacrament). A memorial — remembering Christ's death, not receiving his literal presence. Most Baptist churches observe it monthly or quarterly. Closed communion is common (members only).",
    methodist: "A sacrament and a means of grace. Christ is genuinely present (Wesley affirmed 'real presence' without specifying a mechanism). Open communion — all baptized Christians are welcome at the table. Observed regularly.",
  },
];

const CURRENT_SPLITS = [
  {
    tradition: "Baptist Divisions",
    items: [
      "The Southern Baptist Convention (SBC) — America's largest Protestant denomination — has faced internal conflict over the role of women in ministry, critical race theory, and sexual abuse accountability.",
      "The moderate-conservative split of the 1980s-90s produced the Cooperative Baptist Fellowship, a more centrist alternative.",
      "Black Baptist denominations (National Baptist Convention, Progressive National Baptist Convention) carry distinct theological and social emphases rooted in the Black church tradition.",
    ],
  },
  {
    tradition: "Methodist Divisions",
    items: [
      "The United Methodist Church formally split in 2023-2024 over the ordination and marriage of LGBTQ+ persons. The Global Methodist Church formed as a traditionalist alternative.",
      "The split was driven partly by the growing influence of African and Asian Methodists, who are theologically conservative and numerically dominant in the global denomination.",
      "The African Methodist Episcopal (AME) and AME Zion denominations remain separate, with roots in the racial segregation of American Methodism in the 18th and 19th centuries.",
    ],
  },
];

const SHARED_GROUND = [
  "Both are Protestant. Both reject papal authority, affirm Scripture as the supreme authority for faith and practice, and emphasize the priesthood of all believers.",
  "Both prioritize evangelism and missions. Baptists and Methodists are among the most aggressive church-planting traditions in the world.",
  "Both emphasize personal conversion — the idea that Christianity is not inherited but chosen, not cultural but conscious.",
  "Both have deep roots in the American experience. Together they shaped the revivals, the frontier churches, and the civil rights movement.",
  "Both are struggling with the same post-Christian pressures: declining attendance, cultural irrelevance, and internal fractures over sexuality and politics.",
];

const RELATED_ARTICLES = [
  { title: "The Age of Revivals", href: "/theology/history/the-awakenings" },
  { title: "The Evangelical Movement", href: "/theology/history/the-awakenings" },
  { title: "The Mainline Protestant Collapse", href: "/writing/the-numbers-behind-the-decline" },
  { title: "The Black Church Tradition", href: "/writing/black-church-prophetic-justice" },
  { title: "Christianity in a Post-Christian Age", href: "/writing/the-church-after-cultural-power" },
];

const FAQ_ITEMS = [
  {
    question: "Can a Baptist attend a Methodist church (or vice versa)?",
    answer: "Yes. There is no theological barrier to visiting, worshipping, or even joining. The differences are significant but not church-dividing in the way that, say, Catholic-Protestant differences are. Many Christians move between these traditions over a lifetime without any formal process. The real question is whether the theology shapes you, not just whether the worship style suits you.",
  },
  {
    question: "Why do Baptists not baptize infants?",
    answer: "Because Baptists believe baptism requires a conscious choice. An infant cannot repent, believe, or confess. Baptists read Acts 2:38 ('Repent and be baptized') as a sequence that demands personal volition. Methodists read household baptisms (Acts 16:33) and the covenant promises (Acts 2:39) as including children. The disagreement is about what baptism means, not just who receives it.",
  },
  {
    question: "Are Methodists liberal and Baptists conservative?",
    answer: "That is the stereotype, and it is roughly true of the mainline United Methodist Church and the Southern Baptist Convention in the late twentieth century. But it flattens a complicated picture. The UMC's global membership is deeply conservative. Black Baptist churches are theologically traditional but politically progressive. Generalizations break down the moment you enter an actual congregation.",
  },
  {
    question: "What did John Wesley actually believe?",
    answer: "Wesley was an Anglican priest who never left the Church of England. He believed in justification by faith, the real presence of Christ in communion, the possibility of entire sanctification (Christian perfection), and the obligation of the church to serve the poor. He was not liberal in any modern sense — he was a high-church revivalist who also happened to be a social reformer. The combination confuses people who think those categories cannot overlap.",
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
  name: "Baptist vs. Methodist: What's the Difference?",
  description: "A detailed comparison of Baptist and Methodist Christianity — baptism, governance, theology, worship, and the splits reshaping both traditions today.",
  url: "https://www.livewellbyjamesbell.co/compare/baptist-vs-methodist",
  author: { "@type": "Person", name: "James Bell", url: "https://www.livewellbyjamesbell.co/about" },
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

export default function BaptistVsMethodist() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      <SEOMeta
        title="Baptist vs. Methodist: What's the Difference? | LiveWell"
        description="A detailed comparison of Baptist and Methodist Christianity — baptism, governance, theology, worship, and the splits reshaping both traditions today."
        keywords="Baptist vs Methodist, believer's baptism, infant baptism, Southern Baptist, United Methodist, Wesley, congregational, connectional, Protestant denominations"
        structuredData={[faqSchema, webPageSchema]}
      />

      {/* Hero */}
      <section style={S.hero}>
        <p style={S.eyebrow}>COMPARISON</p>
        <h1 style={S.h1}>Baptist vs. Methodist</h1>
        <p style={S.heroSub}>
          Two traditions born from the same Protestant soil. One insists you choose your own baptism. The other says grace got there first. The differences run deeper than water.
        </p>
      </section>

      {/* Comparison Table */}
      <section style={S.sectionBone}>
        <div style={S.wrap}>
          <p style={S.eyebrow}>POINT BY POINT</p>
          <h2 style={S.h2}>Where they diverge</h2>
          <p style={S.bodyText}>Six categories that separate these two traditions. Both are Protestant. Both are evangelical in origin. But they disagree on what the church is, how it governs itself, and what baptism means.</p>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ display: "grid", gridTemplateColumns: "160px 1fr 1fr", gap: "0", borderBottom: "2px solid var(--mustard)" }} className="compare-header-desktop">
              <div style={{ padding: "16px 16px 16px 0", fontFamily: "var(--U)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-muted)", fontWeight: 600 }}></div>
              <div style={{ padding: "16px", fontFamily: "var(--U)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-muted)", fontWeight: 600 }}>Baptist</div>
              <div style={{ padding: "16px", fontFamily: "var(--U)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-muted)", fontWeight: 600 }}>Methodist</div>
            </div>
            {COMPARISONS.map((row, i) => (
              <div key={i}>
                <div className="compare-row-desktop" style={{ display: "grid", gridTemplateColumns: "160px 1fr 1fr", gap: "0", borderBottom: "1px solid var(--bone-muted)" }}>
                  <div style={{ padding: "20px 16px 20px 0", fontFamily: "var(--F)", fontSize: "18px", fontWeight: 500, color: "var(--ink)" }}>{row.category}</div>
                  <div style={{ padding: "20px 16px", fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", lineHeight: 1.65, borderLeft: "1px solid var(--bone-muted)" }}>{row.baptist}</div>
                  <div style={{ padding: "20px 16px", fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", lineHeight: 1.65, borderLeft: "1px solid var(--bone-muted)" }}>{row.methodist}</div>
                </div>
                <div className="compare-card-mobile" style={{ display: "none" }}>
                  <div style={{ background: "var(--card)", border: "1px solid var(--bone-muted)", marginBottom: "16px", padding: "24px" }}>
                    <p style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 500, color: "var(--ink)", marginBottom: "16px", borderBottom: "2px solid var(--mustard)", paddingBottom: "12px" }}>{row.category}</p>
                    <p style={{ fontFamily: "var(--U)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--mustard-text)", fontWeight: 600, marginBottom: "8px" }}>Baptist</p>
                    <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", lineHeight: 1.65, marginBottom: "20px" }}>{row.baptist}</p>
                    <p style={{ fontFamily: "var(--U)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--mustard-text)", fontWeight: 600, marginBottom: "8px" }}>Methodist</p>
                    <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", lineHeight: 1.65 }}>{row.methodist}</p>
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

      {/* Current Splits */}
      <section style={S.sectionWarm}>
        <div style={S.wrapNarrow}>
          <p style={S.eyebrow}>THE FRACTURES</p>
          <h2 style={S.h2}>The current splits in both traditions</h2>
          <p style={S.bodyText}>Neither tradition is monolithic. Both are fracturing along lines of theology, race, politics, and sexuality. The splits are not signs of weakness. They are signs that the questions still matter enough to divide over.</p>
          {CURRENT_SPLITS.map((split, i) => (
            <div key={i} style={{ marginBottom: i < CURRENT_SPLITS.length - 1 ? "40px" : "0" }}>
              <h3 style={{ fontFamily: "var(--F)", fontSize: "22px", fontWeight: 500, color: "var(--ink)", marginBottom: "16px" }}>{split.tradition}</h3>
              {split.items.map((item, j) => (
                <div key={j} style={{ padding: "12px 0", borderBottom: "1px solid rgba(0,0,0,0.06)", display: "flex", gap: "12px", alignItems: "baseline" }}>
                  <span style={{ fontFamily: "var(--U)", fontSize: "11px", color: "var(--mustard-text)", fontWeight: 600, flexShrink: 0 }}>{"•"}</span>
                  <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", lineHeight: 1.65 }}>{item}</p>
                </div>
              ))}
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
          <h2 style={S.h2}>Choosing a tradition</h2>
          <div style={{ fontFamily: "var(--U)", fontSize: "15px", color: "var(--ink-muted)", lineHeight: 1.75, maxWidth: "64ch" }}>
            <p style={{ marginBottom: "20px" }}>If you believe baptism requires a conscious choice, you belong in a Baptist church. If you believe grace precedes choice and baptism is one of its vehicles, the Wesleyan tradition will make more sense to you.</p>
            <p style={{ marginBottom: "20px" }}>If you want a church where the congregation makes the decisions, the Baptist model gives you that. If you want a church connected to a larger body with shared accountability, the Methodist model offers it.</p>
            <p style={{ marginBottom: "20px" }}>But the deeper question is not about preference. It is about what you believe the church actually is. Is it a gathering of believers who chose to be there, or a community into which God grafts people by grace? The Baptist answer and the Methodist answer are both serious. Both have roots in Scripture. Both have produced faithful Christians for centuries.</p>
            <p>The wrong answer is the one you hold because you have never considered the alternative.</p>
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
          <p style={S.bodyTextWhite}>Sixty essays on the traditions that shaped Western Christianity and the fractures reshaping it now. Baptist and Methodist are two branches. The series maps the whole tree.</p>
          <Link href="/post-christian" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--bone)", color: "var(--ink)", border: "none", padding: "14px 28px", fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", borderRadius: "2px", cursor: "pointer", borderBottom: "2px solid var(--mustard)" }}>Explore the Series</button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
