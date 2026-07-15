import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import CrisisFaq, { faqPageSchema } from "@/components/CrisisFaq";
import { LandingSignup } from "@/components/LandingSignup";

const ARTICLES = [
  { title: "When God Is Silent and the Room Is Empty", slug: "when-god-is-silent-and-the-room-is-empty" },
  { title: "The Theology of Saturday", slug: "the-theology-of-saturday" },
  { title: "What the Psalms Teach About Anger at God", slug: "what-psalms-teach-about-anger-at-god" },
  { title: "Suffering Without Explanation", slug: "suffering-without-explanation" },
  { title: "The Weight That Stays", slug: "the-weight-that-stays" },
];

const FAQ_ITEMS = [
  {
    question: "How long is grief supposed to last?",
    answer:
      "There is no supposed to. Grief does not run on a schedule and it does not end on one \u2014 it changes shape. The early weight that makes breathing hard usually softens into something that can be carried, but carried is the honest word: you do not get over a person you loved. You learn to walk with the weight of them. Anyone who hands you a timeline is telling you about their own discomfort, not about your grief.",
  },
  {
    question: "Is it wrong to be angry at God?",
    answer:
      "Read the Psalms before you answer that. Nearly half of them are complaint \u2014 grief and anger prayed at full volume, and kept in Scripture on purpose. God is not fragile, and anger carried to God is still prayer; it is anger carried away from him that curdles. Say the true thing. He has heard worse from his saints, and he kept their words in his book.",
  },
  {
    question: "Why can't I feel God right now?",
    answer:
      "Numbness is part of grief, not evidence of apostasy. The church's saints have a name for this dark, and it has never disqualified anyone. Do not measure your faith by what you can feel this month. Keep the habits small and honest \u2014 a psalm, a table, one person who checks on you \u2014 and let feeling return on its own clock. It usually does, and it rarely announces itself.",
  },
  {
    question: "When should I be worried about myself?",
    answer:
      "Grief is heavy, but it should not take everything. If you have stopped eating or sleeping for weeks, if the basic things have become impossible, or if the grief has turned into not wanting to be here \u2014 that is not a stage to wait out. It is a today conversation. Call or text 988, tell your doctor, tell one person who loves you. Getting help with grief this heavy is not weak faith. It is what the body of Christ is for.",
  },
];

export default function Grief() {
  return (
    <Layout>
      <SEOMeta
        title="Grief"
        description="Grief does not need to be fixed. It needs to be carried. Essays on loss, suffering, and the God who sits in the wreckage with you."
        keywords="grief, loss, suffering, theology of suffering, Christian grief"
        structuredData={[faqPageSchema(FAQ_ITEMS)]}
      />

      {/* Hero */}
      <section style={{ background: "var(--charcoal)", padding: "clamp(80px,12vw,160px) 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>GRIEF AND LOSS</p>
        <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px,5vw,60px)", fontWeight: 400, color: "var(--charcoal-fg)", maxWidth: "780px", margin: "0 auto", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          Grief does not need to be fixed. It needs to be carried.
        </h1>
      </section>

      {/* Stats */}
      <section style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>YOU ARE NOT ALONE</p>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink)", lineHeight: 1.7, maxWidth: "68ch" }}>
            The church has too often treated grief as a problem to be solved with a verse. It is not. Grief is the evidence that you loved something real. These essays sit in the wreckage with you, not above it.
          </p>
        </div>
      </section>

      {/* Featured Articles */}
      <section style={{ background: "var(--bone-warm)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>START READING</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "32px" }}>Essays for the grief nobody knows how to talk about</h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {ARTICLES.map((a) => (
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

      {/* Book */}
      <section style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>RECOMMENDED READING</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "16px" }}>Earthen Vessels</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "52ch", marginLeft: "auto", marginRight: "auto" }}>
            A book about the fragility we carry and the God who chose to inhabit it. For anyone who has been told to be strong when what they needed was permission to break.
          </p>
          <Link href="/books" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--mustard)", color: "var(--ink)", border: "none", padding: "12px 28px", fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", borderRadius: "3px", cursor: "pointer" }}>Browse Books</button>
          </Link>
        </div>
      </section>

      <CrisisFaq items={FAQ_ITEMS} />

      {/* Real help (QW-6: the care standard requires a visible path) */}
      <section style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>IF YOU NEED MORE THAN AN ESSAY</p>
          <p style={{ fontFamily: "var(--U)", fontSize: "15px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "68ch" }}>Writing can keep you company. It cannot sit across a table from you. These are external organizations we are not affiliated with, whose work we trust — and if the grief has turned into not wanting to be here, that is a today conversation, not a someday one.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <a href="tel:988" style={{ textDecoration: "none" }}>
              <div style={{ background: "var(--card)", padding: "20px 24px", borderRadius: "3px", border: "1px solid rgba(0,0,0,0.06)" }}>
                <p style={{ fontFamily: "var(--U)", fontSize: "15px", fontWeight: 600, color: "var(--ink)", margin: "0 0 4px" }}>988 Suicide & Crisis Lifeline</p>
                <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.6, margin: 0 }}>Call or text 988, any hour. A real person answers.</p>
              </div>
            </a>
            <a href="https://www.griefshare.org" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <div style={{ background: "var(--card)", padding: "20px 24px", borderRadius: "3px", border: "1px solid rgba(0,0,0,0.06)" }}>
                <p style={{ fontFamily: "var(--U)", fontSize: "15px", fontWeight: 600, color: "var(--ink)", margin: "0 0 4px" }}>GriefShare</p>
                <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.6, margin: 0 }}>Grief support groups that meet in local churches — thousands of them, most free.</p>
              </div>
            </a>
            <a href="https://www.psychologytoday.com/us/therapists" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <div style={{ background: "var(--card)", padding: "20px 24px", borderRadius: "3px", border: "1px solid rgba(0,0,0,0.06)" }}>
                <p style={{ fontFamily: "var(--U)", fontSize: "15px", fontWeight: 600, color: "var(--ink)", margin: "0 0 4px" }}>Find a grief counselor</p>
                <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.6, margin: 0 }}>Licensed counselors near you, searchable by specialty.</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section style={{ background: "var(--charcoal)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--charcoal-fg)", marginBottom: "16px" }}>Writing that sits with the weight instead of explaining it away</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "rgba(255,255,255,0.6)", marginBottom: "32px", lineHeight: 1.7 }}>Weekly essays on suffering, faith, and the theology that does not flinch.</p>
          <LandingSignup source="landing-grief" />
        </div>
      </section>

      {/* Next Step */}
      <section style={{ background: "var(--bone-warm)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>NEXT STEP</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "16px" }}>Pray when you cannot find the words</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "52ch", marginLeft: "auto", marginRight: "auto" }}>
            The Prayer Generator gives you language when your own has run out. Not platitudes. Prayers shaped by lament, honesty, and the Psalms.
          </p>
          <Link href="/tools/prayer-generator" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", border: "none", padding: "12px 28px", fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", borderRadius: "3px", cursor: "pointer" }}>Open Prayer Tool</button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
