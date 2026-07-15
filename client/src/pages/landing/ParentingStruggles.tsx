import { Link } from "wouter";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { LandingSignup } from "@/components/LandingSignup";

const ARTICLES = [
  { title: "The Weight of What You Model", slug: "the-weight-of-what-you-model" },
  { title: "Raising Kids Who Think Instead of Perform", slug: "raising-kids-who-think" },
  { title: "When Your Child Asks a Question You Cannot Answer", slug: "when-your-child-asks-a-question" },
  { title: "The Father Wound and the God Question", slug: "the-father-wound-and-the-god-question" },
  { title: "Discipline Without Domination", slug: "discipline-without-domination" },
];

const CLAIMS = [
  {
    head: "A father, not an expert.",
    body: "These essays were written by a man raising five sons, not a specialist writing down at you. Confession comes before counsel. Every page carries the fear it is trying to speak to.",
  },
  {
    head: "No formulas, no guarantees.",
    body: "There is no method here that promises the outcome, no seven steps that turn a child into a result. Modern parenting content sells technique because technique sells. We refuse it, because you already know it does not hold.",
  },
  {
    head: "The Tuesday-afternoon register.",
    body: "The writing lives where parenting actually happens — the front seat of the car, the silence at the table, the question about God that comes ten minutes after lights-out. Not theories about children. The child in front of you.",
  },
];

const FAQ_ITEMS = [
  {
    question: "Am I ruining my kids?",
    answer:
      "The fact that you are asking is the answer to the fear underneath it. Parents who ruin their children do not lie awake searching for whether they are. The worry means you are paying attention, and paying attention is most of what they will remember. Your worst night does not get to be the verdict on your whole parenthood. You are more careful than you feel.",
  },
  {
    question: "How do I handle screens without losing every fight?",
    answer:
      "The fight is almost never about the screen. It is about who gets to decide what your child is being formed by, and a device is simply better at winning attention than you feel some nights. Set the limit for what it protects, not to win the argument. What your child needs is not a household with no screens. It is a parent who is present enough to be worth choosing.",
  },
  {
    question: "Can I raise them in the faith without forcing it?",
    answer:
      "Faith was never meant to be delivered in a lecture. Deuteronomy tells parents to speak of these things when you sit in your house and when you walk by the way — in the car, at the sink, on the ordinary road between one place and the next. You cannot hand a child certainty. You can only let them watch you live as though it is true. What they catch from the walking outlasts anything you force in a sermon.",
  },
  {
    question: "What if church is the thing that hurt them?",
    answer:
      "Then start there, with the wound, not with a defense of the building. A child who was hurt by people who used God's name is carrying something real, and rushing to protect the institution tells them you trust it more than you trust them. Believe the injury first. The God who was misrepresented to them is not the same as the room where it happened, but they will only hear that after they have been heard.",
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

export default function ParentingStruggles() {
  return (
    <Layout>
      <SEOMeta
        title="Parenting Help"
        description="You are not ruining your children. But you need better tools than you were given. Essays on parenting with theology, not guilt."
        keywords="parenting help, Christian parenting, raising children, parenting struggles, father wound"
        structuredData={faqSchema}
      />

      {/* Hero */}
      <section style={{ background: "var(--charcoal)", padding: "clamp(80px,12vw,160px) 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>PARENTING</p>
        <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px,5vw,56px)", fontWeight: 400, color: "var(--charcoal-fg)", maxWidth: "800px", margin: "0 auto", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          You are not ruining your children. But you need better tools than you were given.
        </h1>
      </section>

      {/* What the writing here actually is */}
      <section style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>YOU ARE NOT ALONE</p>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink)", lineHeight: 1.7, maxWidth: "68ch", marginBottom: "40px" }}>
            Most parenting advice is built on fear. Fear that you will ruin them. Fear that they will leave the faith. Fear that you are not enough. These essays start somewhere different. They start with the truth that your children do not need a perfect parent. They need an honest one.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
            {CLAIMS.map((c) => (
              <div key={c.head}>
                <h3 style={{ fontFamily: "var(--F)", fontSize: "22px", fontWeight: 500, color: "var(--ink)", margin: "0 0 8px" }}>{c.head}</h3>
                <p style={{ fontFamily: "var(--U)", fontSize: "15px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, margin: 0, maxWidth: "68ch" }}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section style={{ background: "var(--bone-warm)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>START READING</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "32px" }}>Essays for parents who are done pretending they have it figured out</h2>
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
            Written by a father of five sons. A book about what it means to pastor the people under your own roof before you lead anyone else.
          </p>
          <Link href="/books" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--mustard)", color: "var(--ink)", border: "none", padding: "12px 28px", fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", borderRadius: "3px", cursor: "pointer" }}>Browse Books</button>
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "var(--bone-warm)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>THE QUESTIONS YOU CAME HERE WITH</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "36px" }}>
            {FAQ_ITEMS.map((item) => (
              <div key={item.question}>
                <h3 style={{ fontFamily: "var(--F)", fontSize: "clamp(20px,2.5vw,26px)", fontWeight: 400, color: "var(--ink)", margin: "0 0 12px" }}>{item.question}</h3>
                <p style={{ fontFamily: "var(--U)", fontSize: "15px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.8, margin: 0, maxWidth: "68ch" }}>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real help (the care standard requires a visible path) */}
      <section style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>IF YOU NEED MORE THAN AN ESSAY</p>
          <p style={{ fontFamily: "var(--U)", fontSize: "15px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "68ch" }}>
            Some nights are past what any writing can carry. If your child is in real danger, or your home is at a place these words cannot reach, please do not stay here alone with it. A licensed family counselor can sit in the specifics of your house in a way an essay never will. If you have a pastor, call them tonight. These essays are meant to walk beside you. They were never meant to stand in for the help a real person can give.
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            <a href="tel:988" style={{ textDecoration: "none" }}>
              <div style={{ background: "var(--card)", padding: "20px 24px", borderRadius: "3px", border: "1px solid rgba(0,0,0,0.06)" }}>
                <p style={{ fontFamily: "var(--U)", fontSize: "15px", fontWeight: 600, color: "var(--ink)", margin: "0 0 4px" }}>988 Suicide & Crisis Lifeline</p>
                <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.6, margin: 0 }}>If your child is in danger of harming themselves, call or text 988 now. Any hour. A real person answers.</p>
              </div>
            </a>
            <a href="https://www.psychologytoday.com/us/therapists" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
              <div style={{ background: "var(--card)", padding: "20px 24px", borderRadius: "3px", border: "1px solid rgba(0,0,0,0.06)" }}>
                <p style={{ fontFamily: "var(--U)", fontSize: "15px", fontWeight: 600, color: "var(--ink)", margin: "0 0 4px" }}>Find a family counselor</p>
                <p style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.6, margin: 0 }}>Licensed counselors near you, searchable by specialty — including family and adolescent work.</p>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section style={{ background: "var(--charcoal)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--charcoal-fg)", marginBottom: "16px" }}>Writing for parents who take the work seriously</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "rgba(255,255,255,0.6)", marginBottom: "32px", lineHeight: 1.7 }}>Weekly essays on parenting, family, and what it looks like to raise children with theology instead of guilt.</p>
          <LandingSignup source="landing-parenting-struggles" />
        </div>
      </section>

      {/* Next Step */}
      <section style={{ background: "var(--bone-warm)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>NEXT STEP</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "16px" }}>Get a framework that actually helps</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "52ch", marginLeft: "auto", marginRight: "auto" }}>
            The Parenting Guide tool gives you age-specific, theology-informed questions and practices. Not rules. Not shame. Just honest direction.
          </p>
          <Link href="/tools/parenting-guide" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", border: "none", padding: "12px 28px", fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", borderRadius: "3px", cursor: "pointer" }}>Open Parenting Guide</button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
