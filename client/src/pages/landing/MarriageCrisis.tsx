import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import CrisisFaq, { faqPageSchema } from "@/components/CrisisFaq";
import { LandingSignup } from "@/components/LandingSignup";

const ARTICLES = [
  { title: "When Marriage Becomes a Mirror", slug: "when-marriage-becomes-a-mirror" },
  { title: "The Covenant You Didn't Understand When You Made It", slug: "the-covenant-you-didnt-understand" },
  { title: "Fighting Fair Is Not Enough", slug: "fighting-fair-is-not-enough" },
  { title: "What Silence Actually Costs a Marriage", slug: "what-silence-costs-a-marriage" },
  { title: "Forgiveness Without Pretending", slug: "forgiveness-without-pretending" },
];

const FAQ_ITEMS = [
  {
    question: "Can this marriage actually be saved?",
    answer:
      "No one can promise you that from a distance, and this page will not pretend to. What can be said honestly: many marriages that felt finished were not \u2014 the feeling of being done is usually a symptom of exhaustion, not a verdict on the covenant. The couples who rebuilt did it the unglamorous way: they stopped performing, told the truth with a third person in the room, and repaired one small pattern at a time. Whether that is your story is not decided yet. That is the point \u2014 it is not decided.",
  },
  {
    question: "Should we stay together for the kids?",
    answer:
      "The honest version of this question is harder than either answer: children are not protected by a marriage that stays and keeps wounding, and they are not served by an easy exit either \u2014 they are formed by what they watch. What serves them most is not two people enduring each other but two people repairing, because watching repair happen teaches a child more about covenant than years of quiet tension. If your home has become unsafe, that is a different question with a clear answer: safety comes first.",
  },
  {
    question: "My spouse won't work on it. What can I do alone?",
    answer:
      "You cannot make another person willing, and trying usually deepens the standoff. But a marriage is a pattern, and one person changing their side of the pattern changes the pattern. Get honest about your own contribution first \u2014 not because the drift is all yours, but because your side is the only part you hold. Then invite, plainly, without an ultimatum. Some spouses come to the table late. Some come after watching a change they did not believe was possible.",
  },
  {
    question: "When do we need more than we can do ourselves?",
    answer:
      "Earlier than you think \u2014 most couples wait years too long, until the wound has scar tissue. A good marriage counselor is not an admission of failure; it is a third set of hands on something heavy. And one line that has to be said plainly: if there is violence in your home, that is not a marriage problem to work harder at \u2014 call the National Domestic Violence Hotline at 800-799-7233, today. This page is writing, not counseling. The people behind those doors are the actual help.",
  },
];

export default function MarriageCrisis() {
  return (
    <Layout>
      <SEOMeta
        title="Marriage Crisis"
        description="The silence between you is louder than the fighting ever was. Essays on marriage, conflict, and the cost of covenant love."
        keywords="marriage crisis, marriage help, marriage conflict, covenant marriage, Christian marriage"
        structuredData={[faqPageSchema(FAQ_ITEMS)]}
      />

      {/* Hero */}
      <section style={{ background: "var(--charcoal)", padding: "clamp(80px,12vw,160px) 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>MARRIAGE</p>
        <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px,5vw,60px)", fontWeight: 400, color: "var(--charcoal-fg)", maxWidth: "780px", margin: "0 auto", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          The silence between you is louder than the fighting ever was.
        </h1>
      </section>

      {/* Stats */}
      <section style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>YOU ARE NOT ALONE</p>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink)", lineHeight: 1.7, maxWidth: "68ch" }}>
            Marriage does not fail because two people are incompatible. It fails because two people stop doing the costly work of seeing each other. These essays are not tips. They are theology pressed into the hardest room in the house.
          </p>
        </div>
      </section>

      {/* Featured Articles */}
      <section style={{ background: "var(--bone-warm)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>START READING</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "32px" }}>Essays for the marriage nobody posts about</h2>
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
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "16px" }}>The First Flock</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "52ch", marginLeft: "auto", marginRight: "auto" }}>
            Before you lead a church, you lead a family. A book about what it costs to pastor the people under your own roof first.
          </p>
          <Link href="/books" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--mustard)", color: "var(--ink)", border: "none", padding: "12px 28px", fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", borderRadius: "3px", cursor: "pointer" }}>Browse Books</button>
          </Link>
        </div>
      </section>

      <CrisisFaq items={FAQ_ITEMS} />

      {/* Real help (the care standard requires a visible path — a marriage in
          crisis can include abuse, which is a safety question, not a conflict
          to resolve). */}
      <section style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>IF YOU NEED MORE THAN AN ESSAY</p>
          <p style={{ fontFamily: "var(--U)", fontSize: "15px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "68ch" }}>Writing can keep you company. It cannot sit in the room with you and your spouse. These are external organizations we are not affiliated with, whose work we trust. And if what is happening at home is not conflict but abuse, that is not a marriage problem to work through. It is a safety question, and it is a today conversation.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <a href="tel:18007997233" style={{ textDecoration: "none" }}>
              <div style={{ background: "var(--card)", padding: "20px 24px", borderRadius: "3px", border: "1px solid rgba(0,0,0,0.06)" }}>
                <p style={{ fontFamily: "var(--U)", fontSize: "15px", fontWeight: 600, color: "var(--ink)", margin: "0 0 4px" }}>National Domestic Violence Hotline</p>
                <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.6, margin: 0 }}>Call 1-800-799-7233, or text START to 88788, any hour. Confidential, and for you even if you are only wondering whether it counts.</p>
              </div>
            </a>
            <a href="tel:988" style={{ textDecoration: "none" }}>
              <div style={{ background: "var(--card)", padding: "20px 24px", borderRadius: "3px", border: "1px solid rgba(0,0,0,0.06)" }}>
                <p style={{ fontFamily: "var(--U)", fontSize: "15px", fontWeight: 600, color: "var(--ink)", margin: "0 0 4px" }}>988 Suicide & Crisis Lifeline</p>
                <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.6, margin: 0 }}>If the weight has turned into not wanting to be here, call or text 988. A real person answers.</p>
              </div>
            </a>
            <a href="https://www.psychologytoday.com/us/therapists/marriage-counseling" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <div style={{ background: "var(--card)", padding: "20px 24px", borderRadius: "3px", border: "1px solid rgba(0,0,0,0.06)" }}>
                <p style={{ fontFamily: "var(--U)", fontSize: "15px", fontWeight: 600, color: "var(--ink)", margin: "0 0 4px" }}>Find a marriage counselor</p>
                <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.6, margin: 0 }}>Licensed counselors near you, searchable by specialty and faith.</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section style={{ background: "var(--charcoal)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--charcoal-fg)", marginBottom: "16px" }}>Writing for marriages that refuse to settle</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "rgba(255,255,255,0.6)", marginBottom: "32px", lineHeight: 1.7 }}>Weekly essays on marriage, family, and the theology that holds when the feelings do not.</p>
          <LandingSignup source="landing-marriage-crisis" />
        </div>
      </section>

      {/* Next Step */}
      <section style={{ background: "var(--bone-warm)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>NEXT STEP</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "16px" }}>Assess where your marriage actually is</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "52ch", marginLeft: "auto", marginRight: "auto" }}>
            The Marriage Assessment is not a pass-fail test. Fifteen honest questions, a straight reading of where the marriage is strong and where it is strained, and what to do next.
          </p>
          <Link href="/tools/marriage-assessment" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", border: "none", padding: "12px 28px", fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", borderRadius: "3px", cursor: "pointer" }}>Start the Assessment</button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
