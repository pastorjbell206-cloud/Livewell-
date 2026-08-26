import { Link } from "wouter";
import { useState } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

/* ── data ─────────────────────────────────────────────────────────── */

const COMPARISONS = [
  {
    category: "Bible",
    evangelical: "Inerrancy or infallibility. Scripture is God-breathed, without error in all it affirms. The Chicago Statement on Biblical Inerrancy (1978) is the benchmark. The Bible is not merely a witness to revelation — it is revelation.",
    mainline: "Critical scholarship. Scripture is inspired but mediated through human authors, cultures, and literary genres. Historical-critical methods are essential tools, not threats. The Bible is the primary witness to God's self-disclosure — but witness and dictation are not the same thing.",
  },
  {
    category: "Theology",
    evangelical: "Conservative orthodoxy. The virgin birth, bodily resurrection, substitutionary atonement, and literal return of Christ are non-negotiable. The boundary markers are doctrinal. If you do not hold them, you are outside the tradition.",
    mainline: "Progressive or moderate orthodoxy. The creeds are affirmed but often reinterpreted through contemporary lenses. The boundary markers are relational and liturgical more than doctrinal. Theological diversity within a tradition is a feature, not a bug.",
  },
  {
    category: "Culture",
    evangelical: "Engagement with a prophetic edge. The culture is fallen and needs the gospel. Evangelicals speak into the culture from a position of conviction — sometimes prophetically, sometimes defensively. The critique mainline Protestants make: you confuse the gospel with American conservatism.",
    mainline: "Accommodation with a pastoral instinct. The culture carries genuine insight and the church must listen. Mainline Protestants seek dialogue rather than confrontation. The critique evangelicals make: you have adapted so thoroughly to the culture that you have nothing distinct left to say.",
  },
  {
    category: "Politics",
    evangelical: "The Religious Right (post-1979). Jerry Falwell, the Moral Majority, and the alignment of evangelicalism with the Republican Party. The issues: abortion, marriage, religious liberty. The risk: the gospel becomes a platform plank.",
    mainline: "The Social Gospel (post-1900). Walter Rauschenbusch, the civil rights movement, and the alignment of mainline Protestantism with progressive politics. The issues: poverty, racism, war, the environment. The risk: the gospel becomes a social program.",
  },
  {
    category: "Mission",
    evangelical: "Evangelism and church planting. The Great Commission is the central mandate. Personal conversion is the goal. Global missions is the strategy. The Billy Graham model: preach the gospel, call for a decision.",
    mainline: "Service and justice. The Great Commandment is the central mandate. Social transformation is the goal. Community development, advocacy, and institutional presence are the strategy. The Dorothy Day model: serve the poor, change the structures.",
  },
  {
    category: "Demographics",
    evangelical: "Growing globally, declining in the American mainline. The SBC has lost members since 2006 but remains the largest Protestant denomination in the U.S. Global evangelicalism — especially in Africa, Latin America, and Asia — is exploding.",
    mainline: "Declining steeply. The seven sisters (UMC, PCUSA, ELCA, Episcopal, UCC, Disciples, ABC-USA) have lost between 25% and 60% of their membership since 1965. The median age in most mainline congregations is over sixty. The institutions remain. The people are leaving.",
  },
];

const DEMOGRAPHICS_DATA = [
  { label: "Southern Baptist Convention", change: "-13% since 2006", direction: "down" },
  { label: "United Methodist Church", change: "-26% since 2000", direction: "down" },
  { label: "Presbyterian Church (USA)", change: "-47% since 1983", direction: "down" },
  { label: "Episcopal Church", change: "-40% since 1965", direction: "down" },
  { label: "Nondenominational Evangelical", change: "+60% since 2000", direction: "up" },
  { label: "Global Pentecostal/Charismatic", change: "+400% since 1970", direction: "up" },
];

const SHARED_GROUND = [
  "Both are Protestant. Both trace their lineage to the Reformation and affirm the core Protestant principles: Scripture as primary authority, justification by grace, the priesthood of all believers.",
  "Both care about the world. The disagreement is over strategy, not compassion. Evangelicals build hospitals and orphanages alongside their preaching. Mainline Protestants preach and pray alongside their advocacy.",
  "Both are losing ground in the West. Neither model — neither the countercultural stance nor the accommodating one — has reversed the secularization of American society.",
  "Both produced heroes. Martin Luther King Jr. was trained in mainline theology and preached with evangelical fire. Billy Graham was an evangelist who befriended presidents from both parties.",
  "Both need each other. Evangelicalism without mainline social conscience becomes theologically rigorous and socially blind. Mainline Protestantism without evangelical conviction becomes socially relevant and theologically empty.",
];

const RELATED_ARTICLES = [
  { title: "The Missionary Century", href: "/theology/history/the-missionary-century" },
  { title: "The Mainline Protestant Collapse", href: "/writing/the-numbers-behind-the-decline" },
  { title: "The Social Gospel and Its Critics", href: "/writing/when-justice-becomes-a-gospel" },
  { title: "The Fundamentalist-Modernist Controversy", href: "/theology/history" },
  { title: "Christianity in a Post-Christian Age", href: "/writing/the-church-after-cultural-power" },
];

const FAQ_ITEMS = [
  {
    question: "What does 'evangelical' actually mean?",
    answer: "Historian David Bebbington defined four marks: conversionism (the need for personal conversion), activism (the gospel demands action), biblicism (high regard for Scripture), and crucicentrism (focus on Christ's atoning work on the cross). The word comes from the Greek euangelion, meaning 'good news.' In practice, it has become as much a political and cultural identity as a theological one — which is part of the problem.",
  },
  {
    question: "What are the 'mainline' denominations?",
    answer: "The seven sisters: United Methodist Church, Evangelical Lutheran Church in America, Presbyterian Church (USA), Episcopal Church, United Church of Christ, Christian Church (Disciples of Christ), and American Baptist Churches USA. They were called 'mainline' because they dominated American religious life from the colonial era through the mid-twentieth century. The term is geographical as much as theological — these were the churches on the main line of the Pennsylvania Railroad running through affluent Philadelphia suburbs.",
  },
  {
    question: "Why is the mainline shrinking?",
    answer: "Multiple factors. Dean Kelley argued in 1972 (Why Conservative Churches Are Growing) that churches demanding less of their members will always lose to churches demanding more. Others point to low birth rates, weak catechesis, cultural accommodation that erased theological distinctiveness, and the general secularization of the educated class that mainline churches historically served. The causes are debated. The numbers are not.",
  },
  {
    question: "Are evangelicals just Republicans who pray?",
    answer: "That is the caricature, and there is enough truth in it to sting. Since the Moral Majority (1979), white evangelicalism has been closely aligned with the Republican Party. But Black evangelicals vote overwhelmingly Democratic. Latino evangelicals are politically diverse. Global evangelicals do not map onto American partisan categories at all. The conflation of evangelicalism with one party is an American phenomenon, not a theological inevitability.",
  },
  {
    question: "Can you be both evangelical and mainline?",
    answer: "Historically, yes. The mainline denominations were evangelical in the Bebbington sense well into the twentieth century. There are still evangelical Presbyterians in the PCUSA, evangelical Lutherans in the ELCA, and evangelical Episcopalians. They are a minority in their denominations but they exist, and they would argue that being pushed out is not the same as having left. The labels have hardened into tribes. The reality on the ground is messier.",
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
  name: "Evangelical vs. Mainline: What's the Difference?",
  description: "A detailed comparison of evangelical and mainline Protestantism — theology, Bible, culture, politics, demographics, and why the divide matters for the future of American Christianity.",
  url: "https://www.livewellbyjamesbell.co/compare/evangelical-vs-mainline",
  author: { "@type": "Person", name: "James Bell", url: "https://www.livewellbyjamesbell.co/about" },
  publisher: { "@type": "Organization", name: "LiveWell by James Bell" },
};

/* ── styles ───────────────────────────────────────────────────────── */

const S = {
  hero: { background: "var(--charcoal)", padding: "clamp(80px,12vw,160px) 24px", textAlign: "center" as const },
  eyebrow: { fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase" as const, color: "var(--mustard-text)", marginBottom: "24px" },
  h1: { fontFamily: "var(--F)", fontSize: "clamp(32px,5vw,60px)", fontWeight: 400, color: "var(--charcoal-fg)", maxWidth: "780px", margin: "0 auto", lineHeight: 1.15, letterSpacing: "-0.02em" },
  heroSub: { fontFamily: "var(--U)", fontSize: "16px", color: "rgba(255,255,255,0.6)", marginTop: "32px", maxWidth: "620px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 },
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

export default function EvangelicalVsMainline() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      <SEOMeta
        title="Evangelical vs. Mainline: What's the Difference? | LiveWell"
        description="A detailed comparison of evangelical and mainline Protestantism — theology, Bible, culture, politics, demographics, and why the divide matters."
        keywords="evangelical vs mainline, Protestant denominations, evangelical theology, mainline decline, Religious Right, Social Gospel, SBC, PCUSA, UMC, evangelical definition"
        structuredData={[faqSchema, webPageSchema]}
      />

      {/* Hero */}
      <section style={S.hero}>
        <p style={{ ...S.eyebrow, color: "var(--mustard)" }}>COMPARISON</p>
        <h1 style={S.h1}>Evangelical vs. Mainline</h1>
        <p style={S.heroSub}>
          One side says the church must confront the culture. The other says the church must listen to it. Both are right about the other's blind spot. Neither has figured out what comes next.
        </p>
      </section>

      {/* Comparison Table */}
      <section style={S.sectionBone}>
        <div style={S.wrap}>
          <p style={S.eyebrow}>POINT BY POINT</p>
          <h2 style={S.h2}>Where they diverge</h2>
          <p style={S.bodyText}>These categories are oversimplified. They are also useful. The real picture is messier than any comparison chart — but you have to start somewhere, and this is where the fault lines run.</p>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="compare-header-desktop" style={{ display: "grid", gridTemplateColumns: "160px 1fr 1fr", gap: "0", borderBottom: "2px solid var(--mustard)" }}>
              <div style={{ padding: "16px 16px 16px 0" }}></div>
              <div style={{ padding: "16px", fontFamily: "var(--U)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-muted)", fontWeight: 600 }}>Evangelical</div>
              <div style={{ padding: "16px", fontFamily: "var(--U)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--ink-muted)", fontWeight: 600 }}>Mainline</div>
            </div>
            {COMPARISONS.map((row, i) => (
              <div key={i}>
                <div className="compare-row-desktop" style={{ display: "grid", gridTemplateColumns: "160px 1fr 1fr", gap: "0", borderBottom: "1px solid var(--bone-muted)" }}>
                  <div style={{ padding: "20px 16px 20px 0", fontFamily: "var(--F)", fontSize: "18px", fontWeight: 500, color: "var(--ink)" }}>{row.category}</div>
                  <div style={{ padding: "20px 16px", fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", lineHeight: 1.65, borderLeft: "1px solid var(--bone-muted)" }}>{row.evangelical}</div>
                  <div style={{ padding: "20px 16px", fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", lineHeight: 1.65, borderLeft: "1px solid var(--bone-muted)" }}>{row.mainline}</div>
                </div>
                <div className="compare-card-mobile" style={{ display: "none" }}>
                  <div style={{ background: "var(--card)", border: "1px solid var(--bone-muted)", marginBottom: "16px", padding: "24px" }}>
                    <p style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 500, color: "var(--ink)", marginBottom: "16px", borderBottom: "2px solid var(--mustard)", paddingBottom: "12px" }}>{row.category}</p>
                    <p style={{ fontFamily: "var(--U)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--mustard-text)", fontWeight: 600, marginBottom: "8px" }}>Evangelical</p>
                    <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", lineHeight: 1.65, marginBottom: "20px" }}>{row.evangelical}</p>
                    <p style={{ fontFamily: "var(--U)", fontSize: "10px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--mustard-text)", fontWeight: 600, marginBottom: "8px" }}>Mainline</p>
                    <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted)", lineHeight: 1.65 }}>{row.mainline}</p>
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

      {/* Demographics */}
      <section style={S.sectionWarm}>
        <div style={S.wrapNarrow}>
          <p style={S.eyebrow}>THE NUMBERS</p>
          <h2 style={S.h2}>Who is growing, who is shrinking</h2>
          <p style={S.bodyText}>Demographics do not prove theology. But they reveal something about whether a tradition's model is sustainable. The numbers tell a story neither side finds entirely comfortable.</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {DEMOGRAPHICS_DATA.map((item, i) => (
              <div key={i} style={{ padding: "16px 0", borderBottom: "1px solid rgba(0,0,0,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontFamily: "var(--F)", fontSize: "18px", fontWeight: 400, color: "var(--ink)" }}>{item.label}</span>
                <span style={{ fontFamily: "var(--U)", fontSize: "13px", fontWeight: 500, color: item.direction === "up" ? "var(--ok)" : "var(--alert)" }}>{item.change}</span>
              </div>
            ))}
          </div>
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
          <h2 style={S.h2}>The honest assessment</h2>
          <div style={{ fontFamily: "var(--U)", fontSize: "15px", color: "var(--ink-muted)", lineHeight: 1.75, maxWidth: "64ch" }}>
            <p style={{ marginBottom: "20px" }}>Evangelicalism has conviction. It knows what it believes and it says it clearly. But it has often confused cultural conservatism with the gospel, and it has sometimes purchased theological clarity at the cost of intellectual honesty. When you are afraid to ask hard questions about the Bible, you are not defending the faith. You are insulating it.</p>
            <p style={{ marginBottom: "20px" }}>Mainline Protestantism has integrity about hard questions. It takes scholarship seriously, engages the culture honestly, and has a long tradition of service to the poor. But it has often accommodated so thoroughly to the prevailing culture that it has nothing prophetic left to say. A church that only tells the culture what it already believes is not a church. It is an echo.</p>
            <p style={{ marginBottom: "20px" }}>The Christianity the West needs will have the conviction of evangelicalism and the intellectual courage of the mainline. It will read the Bible with reverence and with critical tools. It will confront the culture and listen to it. It will hold doctrine and practice compassion without apology for either.</p>
            <p>That combination barely exists. Which is why the work matters.</p>
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
          <p style={S.bodyTextWhite}>Sixty essays on the fractures inside Western Christianity. Evangelical and mainline are two poles. The series maps the full spectrum.</p>
          <Link href="/post-christian" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--bone)", color: "var(--ink)", border: "none", padding: "14px 28px", fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", borderRadius: "2px", cursor: "pointer", borderBottom: "2px solid var(--mustard)" }}>Explore the Series</button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
