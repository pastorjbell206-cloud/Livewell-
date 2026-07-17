import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import CrisisFaq, { faqPageSchema } from "@/components/CrisisFaq";
import { LandingSignup } from "@/components/LandingSignup";

const ARTICLES = [
  { title: "When Fear Rewrites Theology", slug: "when-fear-rewrites-theology" },
  { title: "When God Doesn't Make Sense", slug: "when-god-doesnt-make-sense" },
  { title: "What If We're Wrong?", slug: "what-if-we-are-wrong" },
  { title: "The Dark Night of the Soul When God Feels Absent", slug: "dark-night-god-feels-absent" },
  { title: "Constantine's Bargain", slug: "constantines-bargain" },
];

const FAQ_ITEMS = [
  {
    question: "Am I losing my faith?",
    answer:
      "Maybe. Or maybe what is coming down is scaffolding \u2014 the cultural additions, the easy answers, the version of God you were handed at twelve \u2014 and the falling feels like everything is falling. Deconstruction and destruction are not the same word. You will not know which this is for a while, and you do not have to know today. What you believe at the bottom of the question is allowed to take longer than the people around you find comfortable.",
  },
  {
    question: "Can I ask these questions and still belong?",
    answer:
      "Here, yes \u2014 that is most of the reason this site exists. And in the wider church, longer than you have been told: Thomas asked for evidence and was given wounds to touch, not a lecture. Find the people who do not flinch when you say the true thing out loud; they exist in more congregations than the loud voices suggest. A faith that cannot be questioned was never going to hold you anyway.",
  },
  {
    question: "What if I stop believing?",
    answer:
      "Some people do walk away, and pretending otherwise would be the kind of dishonesty that put you in this room. But notice what you are doing right now: reading, asking, refusing the cheap version of both belief and unbelief. Keep doing that with both hands open \u2014 read the strongest skeptics and the strongest believers, never the strawmen of either. You are not required to decide under a deadline. The truth is not going anywhere.",
  },
  {
    question: "Where do I start rebuilding?",
    answer:
      "Smaller and older. Not the culture war, not the personalities \u2014 the Gospels read slowly, the creed the church has confessed for seventeen centuries, one community where honesty is safe. This site keeps a road for exactly this walk: the skeptic track, and the reading paths, built to be taken in order. Rebuild on what has carried weight for two thousand years, not on whatever collapsed last year.",
  },
];

export default function FaithCrisis() {
  return (
    <Layout>
      <SEOMeta
        title="Faith Crisis"
        description="When the faith you were given stops holding weight. Essays for the honest, the doubting, and the ones who refuse to stop asking."
        keywords="faith crisis, doubt, deconstruction, theology, questioning faith"
        structuredData={[faqPageSchema(FAQ_ITEMS)]}
      />

      {/* Hero */}
      <section style={{ background: "var(--charcoal)", padding: "clamp(80px,12vw,160px) 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>FAITH AND DOUBT</p>
        <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px,5vw,60px)", fontWeight: 400, color: "var(--charcoal-fg)", maxWidth: "780px", margin: "0 auto", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          When the faith you were given stops holding weight.
        </h1>
      </section>

      {/* Stats */}
      <section style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>YOU ARE NOT ALONE</p>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink)", lineHeight: 1.7, maxWidth: "68ch" }}>
            Doubt is not the opposite of faith. It is the immune system of a faith that refuses to be shallow. These essays do not offer easy resolution. They offer company for the long road.
          </p>
        </div>
      </section>

      {/* Featured Articles */}
      <section style={{ background: "var(--bone-warm)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>START READING</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "32px" }}>Essays for the questions you were told not to ask</h2>
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
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "16px" }}>The Monster in the Mirror</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "52ch", marginLeft: "auto", marginRight: "auto" }}>
            A book about what you find when you stop running from your own reflection. For anyone whose faith has become a mirror they are afraid to look into.
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
          <p style={{ fontFamily: "var(--U)", fontSize: "15px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "68ch" }}>Doubt is not an emergency. But it rarely travels alone — and if what came with it is despair, or a darkness you cannot think your way out of, that part deserves a real person, not just a reading list. These are external organizations we are not affiliated with, whose work we trust.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <a href="tel:988" style={{ textDecoration: "none" }}>
              <div style={{ background: "var(--card)", padding: "20px 24px", borderRadius: "3px", border: "1px solid rgba(0,0,0,0.06)" }}>
                <p style={{ fontFamily: "var(--U)", fontSize: "15px", fontWeight: 600, color: "var(--ink)", margin: "0 0 4px" }}>988 Suicide & Crisis Lifeline</p>
                <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.6, margin: 0 }}>Call or text 988, any hour. For the nights the questions turn into something heavier.</p>
              </div>
            </a>
            <a href="https://www.psychologytoday.com/us/therapists" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <div style={{ background: "var(--card)", padding: "20px 24px", borderRadius: "3px", border: "1px solid rgba(0,0,0,0.06)" }}>
                <p style={{ fontFamily: "var(--U)", fontSize: "15px", fontWeight: 600, color: "var(--ink)", margin: "0 0 4px" }}>Find a counselor</p>
                <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.6, margin: 0 }}>Licensed therapy and honest faith are not enemies. Many counselors hold both with care.</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section style={{ background: "var(--charcoal)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--charcoal-fg)", marginBottom: "16px" }}>Writing for the questions that keep you up at night</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "rgba(255,255,255,0.6)", marginBottom: "32px", lineHeight: 1.7 }}>Weekly essays on faith, doubt, and what it means to believe with your eyes open.</p>
          <LandingSignup source="landing-faith-crisis" />
        </div>
      </section>

      {/* Next Step */}
      <section style={{ background: "var(--bone-warm)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>NEXT STEP</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "16px" }}>Find out where your questions actually sit</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "52ch", marginLeft: "auto", marginRight: "auto" }}>
            The Theology Quiz is not a test you can fail. It maps where your foundations are solid and where the gaps are, and hands you the reading that meets you there.
          </p>
          <Link href="/tools/theology-quiz" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", border: "none", padding: "12px 28px", fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", borderRadius: "3px", cursor: "pointer" }}>Take the Theology Quiz</button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
