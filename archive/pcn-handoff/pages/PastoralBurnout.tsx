import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import CrisisFaq, { faqPageSchema } from "@/components/CrisisFaq";
import { LandingSignup } from "@/components/LandingSignup";

const ARTICLES = [
  { title: "The Pastor Nobody Checks On", slug: "the-pastor-nobody-checks-on" },
  { title: "When the Calling Costs More Than They Told You", slug: "when-the-calling-costs-more" },
  { title: "Burnout Is Not a Badge of Honor", slug: "burnout-is-not-a-badge" },
  { title: "The Loneliest Room in the Church", slug: "the-loneliest-room-in-the-church" },
  { title: "Why Pastors Quit", slug: "why-pastors-quit" },
];

const FAQ_ITEMS = [
  {
    question: "Is it a sin to want to quit?",
    answer:
      "No. Elijah wanted to die under the broom tree, and God's response was food and sleep, not a rebuke. Wanting out is usually the soul reporting that the load is wrong \u2014 not that the call was false. The question underneath deserves to be slowed down: is it the ministry you need to leave, or the way you have been carrying it? Do not answer that alone, and do not answer it this week.",
  },
  {
    question: "How do I know if I'm burned out or just tired?",
    answer:
      "Tired lifts. A real Sabbath, a vacation, a stretch of sleep \u2014 tired responds to rest. Burnout does not lift with a day off: the dread is waiting on the other side of it, the sermons go through the motions, and the people you love start to feel like appointments. If rest has stopped working, that is the line. The Emotional Health Assessment on this site will put honest language on where you are, and the writing here names the weight without flinching.",
  },
  {
    question: "Who can I even talk to?",
    answer:
      "The loneliness is structural: you are the one person in the building who cannot use the building. So the help has to come from outside it \u2014 a counselor who has sat with pastors before, a friend in ministry who owes you nothing, a network of others who know the weight; the Pastors Connection Network exists for exactly this. What does not work is the thing most of us do instead: carrying it alone and calling it faithfulness.",
  },
  {
    question: "What do I tell my church?",
    answer:
      "Less than your fear wants to confess, and more than your pride wants to show. Your elders or your board should hear the truth \u2014 not every tremor, but the real state of things \u2014 because leading people while hiding from them is a second job stacked on the first. A church that punishes a pastor for being human is telling you something you need to know. Most churches, told honestly and early, respond better than the fear predicted.",
  },
];

export default function PastoralBurnout() {
  return (
    <Layout>
      <SEOMeta
        title="Pastoral Burnout"
        description="Ministry was never supposed to feel like this. Resources for pastors carrying more than they were trained to hold."
        keywords="pastoral burnout, ministry exhaustion, pastor mental health, clergy burnout"
        structuredData={[faqPageSchema(FAQ_ITEMS)]}
      />

      {/* Hero */}
      <section style={{ background: "var(--charcoal)", padding: "clamp(80px,12vw,160px) 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>FOR PASTORS</p>
        <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px,5vw,60px)", fontWeight: 400, color: "var(--charcoal-fg)", maxWidth: "780px", margin: "0 auto", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          Ministry was never supposed to feel like this.
        </h1>
      </section>

      {/* Stats */}
      <section style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>YOU ARE NOT ALONE</p>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink)", lineHeight: 1.7, maxWidth: "68ch" }}>
            The weight you carry is real. The exhaustion is not weakness. And the silence around it is not safety — it is the very thing making it worse. These essays are written from inside the room, not from a safe distance.
          </p>
        </div>
      </section>

      {/* Featured Articles */}
      <section style={{ background: "var(--bone-warm)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>START READING</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "32px" }}>Essays for the pastor who is tired of pretending</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
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
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "16px" }}>Dangerous Calling</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "52ch", marginLeft: "auto", marginRight: "auto" }}>
            A book about what happens to the pastor when no one is watching. The office named for what it actually costs.
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
          <p style={{ fontFamily: "var(--U)", fontSize: "15px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "68ch" }}>Essays help a pastor feel less alone. They are not care. These are external organizations we are not affiliated with, whose work we trust — and asking for help is not the end of your ministry. It is usually how it survives.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <a href="https://www.focusonthefamily.com/get-help/clergy-care/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <div style={{ background: "var(--card)", padding: "20px 24px", borderRadius: "3px", border: "1px solid rgba(0,0,0,0.06)" }}>
                <p style={{ fontFamily: "var(--U)", fontSize: "15px", fontWeight: 600, color: "var(--ink)", margin: "0 0 4px" }}>Focus on the Family Clergy Care</p>
                <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.6, margin: 0 }}>Free counseling consultation for pastors and their families.</p>
              </div>
            </a>
            <a href="tel:988" style={{ textDecoration: "none" }}>
              <div style={{ background: "var(--card)", padding: "20px 24px", borderRadius: "3px", border: "1px solid rgba(0,0,0,0.06)" }}>
                <p style={{ fontFamily: "var(--U)", fontSize: "15px", fontWeight: 600, color: "var(--ink)", margin: "0 0 4px" }}>988 Suicide & Crisis Lifeline</p>
                <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.6, margin: 0 }}>Call or text 988, any hour. Pastors call it too.</p>
              </div>
            </a>
            <a href="https://www.psychologytoday.com/us/therapists" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <div style={{ background: "var(--card)", padding: "20px 24px", borderRadius: "3px", border: "1px solid rgba(0,0,0,0.06)" }}>
                <p style={{ fontFamily: "var(--U)", fontSize: "15px", fontWeight: 600, color: "var(--ink)", margin: "0 0 4px" }}>Find a counselor</p>
                <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.6, margin: 0 }}>Licensed counselors near you — many work with clergy and understand the role.</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section style={{ background: "var(--charcoal)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--charcoal-fg)", marginBottom: "16px" }}>Get essays for pastors delivered weekly</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "rgba(255,255,255,0.6)", marginBottom: "32px", lineHeight: 1.7 }}>No spam. No guilt. Just writing that takes the weight of your calling seriously.</p>
          <LandingSignup source="landing-pastoral-burnout" />
        </div>
      </section>

      {/* Next Step */}
      <section style={{ background: "var(--bone-warm)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>NEXT STEP</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "16px" }}>Find out where you actually are</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "52ch", marginLeft: "auto", marginRight: "auto" }}>
            Start with the Emotional Health Assessment — fifteen honest questions on rest, boundaries, and grief, private to your browser — and the Pastors Connection Network for the company of people who know the weight.
          </p>
          <Link href="/tools/emotional-health" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", border: "none", padding: "12px 28px", fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", borderRadius: "3px", cursor: "pointer" }}>Take the Burnout Diagnostic</button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
