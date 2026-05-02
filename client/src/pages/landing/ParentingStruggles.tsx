import { Link } from "wouter";
import { useState } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const ARTICLES = [
  { title: "The Weight of What You Model", slug: "the-weight-of-what-you-model" },
  { title: "Raising Kids Who Think Instead of Perform", slug: "raising-kids-who-think" },
  { title: "When Your Child Asks a Question You Cannot Answer", slug: "when-your-child-asks-a-question" },
  { title: "The Father Wound and the God Question", slug: "the-father-wound-and-the-god-question" },
  { title: "Discipline Without Domination", slug: "discipline-without-domination" },
];

export default function ParentingStruggles() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <Layout>
      <SEOMeta
        title="Parenting Help"
        description="You are not ruining your children. But you need better tools than you were given. Essays on parenting with theology, not guilt."
        keywords="parenting help, Christian parenting, raising children, parenting struggles, father wound"
      />

      {/* Hero */}
      <section style={{ background: "var(--charcoal)", padding: "clamp(80px,12vw,160px) 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>PARENTING</p>
        <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px,5vw,56px)", fontWeight: 400, color: "white", maxWidth: "800px", margin: "0 auto", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          You are not ruining your children. But you need better tools than you were given.
        </h1>
      </section>

      {/* Stats */}
      <section style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>YOU ARE NOT ALONE</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px", marginBottom: "32px" }}>
            <div>
              <p style={{ fontFamily: "var(--F)", fontSize: "48px", fontWeight: 400, color: "var(--ink)", lineHeight: 1 }}>73%</p>
              <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted, #5A5448)", marginTop: "8px", lineHeight: 1.6 }}>of parents say they are making it up as they go. The confidence you see in others is usually performance.</p>
            </div>
            <div>
              <p style={{ fontFamily: "var(--F)", fontSize: "48px", fontWeight: 400, color: "var(--ink)", lineHeight: 1 }}>1 in 4</p>
              <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted, #5A5448)", marginTop: "8px", lineHeight: 1.6 }}>fathers grew up without a model for the kind of father they want to be.</p>
            </div>
          </div>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink)", lineHeight: 1.7, maxWidth: "68ch" }}>
            Most parenting advice is built on fear. Fear that you will ruin them. Fear that they will leave the faith. Fear that you are not enough. These essays start somewhere different. They start with the truth that your children do not need a perfect parent. They need an honest one.
          </p>
        </div>
      </section>

      {/* Featured Articles */}
      <section style={{ background: "var(--bone-warm)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>START READING</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "32px" }}>Essays for parents who are done pretending they have it figured out</h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {ARTICLES.map((a) => (
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

      {/* Book */}
      <section style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>RECOMMENDED READING</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "16px" }}>The First Flock</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "52ch", marginLeft: "auto", marginRight: "auto" }}>
            Written by a father of five sons. A book about what it means to pastor the people under your own roof before you lead anyone else.
          </p>
          <Link href="/books" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--mustard)", color: "var(--ink)", border: "none", padding: "12px 28px", fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", borderRadius: "3px", cursor: "pointer" }}>Browse Books</button>
          </Link>
        </div>
      </section>

      {/* Email Signup */}
      <section style={{ background: "var(--charcoal)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "white", marginBottom: "16px" }}>Writing for parents who take the work seriously</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "rgba(255,255,255,0.6)", marginBottom: "32px", lineHeight: 1.7 }}>Weekly essays on parenting, family, and what it looks like to raise children with theology instead of guilt.</p>
          {submitted ? (
            <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--mustard)" }}>Thank you. Check your inbox.</p>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", gap: "8px", maxWidth: "440px", margin: "0 auto" }}>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" style={{ flex: 1, padding: "12px 16px", border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.05)", color: "white", fontFamily: "var(--U)", fontSize: "14px", borderRadius: "3px", outline: "none" }} />
              <button type="submit" style={{ background: "var(--mustard)", color: "var(--ink)", border: "none", padding: "12px 24px", fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", borderRadius: "3px", cursor: "pointer", whiteSpace: "nowrap" }}>Subscribe</button>
            </form>
          )}
        </div>
      </section>

      {/* Next Step */}
      <section style={{ background: "var(--bone-warm)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>NEXT STEP</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "16px" }}>Get a framework that actually helps</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "52ch", marginLeft: "auto", marginRight: "auto" }}>
            The Parenting Guide tool gives you age-specific, theology-informed questions and practices. Not rules. Not shame. Just honest direction.
          </p>
          <Link href="/tools/parenting-guide" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--charcoal)", color: "white", border: "none", padding: "12px 28px", fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", borderRadius: "3px", cursor: "pointer" }}>Open Parenting Guide</button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
