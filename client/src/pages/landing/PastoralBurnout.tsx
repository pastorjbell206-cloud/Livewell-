import { Link } from "wouter";
import { useState } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const ARTICLES = [
  { title: "The Pastor Nobody Checks On", slug: "the-pastor-nobody-checks-on" },
  { title: "When the Calling Costs More Than They Told You", slug: "when-the-calling-costs-more" },
  { title: "Burnout Is Not a Badge of Honor", slug: "burnout-is-not-a-badge" },
  { title: "The Loneliest Room in the Church", slug: "the-loneliest-room-in-the-church" },
  { title: "Why Pastors Quit", slug: "why-pastors-quit" },
];

export default function PastoralBurnout() {
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
        title="Pastoral Burnout"
        description="Ministry was never supposed to feel like this. Resources for pastors carrying more than they were trained to hold."
        keywords="pastoral burnout, ministry exhaustion, pastor mental health, clergy burnout"
      />

      {/* Hero */}
      <section style={{ background: "var(--charcoal)", padding: "clamp(80px,12vw,160px) 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>FOR PASTORS</p>
        <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px,5vw,60px)", fontWeight: 400, color: "white", maxWidth: "780px", margin: "0 auto", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          Ministry was never supposed to feel like this.
        </h1>
      </section>

      {/* Stats */}
      <section style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>YOU ARE NOT ALONE</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px", marginBottom: "32px" }}>
            <div>
              <p style={{ fontFamily: "var(--F)", fontSize: "48px", fontWeight: 400, color: "var(--ink)", lineHeight: 1 }}>38%</p>
              <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted, #5A5448)", marginTop: "8px", lineHeight: 1.6 }}>of pastors have seriously considered quitting full-time ministry in the last year.</p>
            </div>
            <div>
              <p style={{ fontFamily: "var(--F)", fontSize: "48px", fontWeight: 400, color: "var(--ink)", lineHeight: 1 }}>50%</p>
              <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted, #5A5448)", marginTop: "8px", lineHeight: 1.6 }}>feel unable to meet the demands of the job. Half feel isolated with no one to confide in.</p>
            </div>
          </div>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink)", lineHeight: 1.7, maxWidth: "68ch" }}>
            The weight you carry is real. The exhaustion is not weakness. And the silence around it is not safety -- it is the very thing making it worse. These essays are written from inside the room, not from a safe distance.
          </p>
        </div>
      </section>

      {/* Featured Articles */}
      <section style={{ background: "var(--bone-warm)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>START READING</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "32px" }}>Essays for the pastor who is tired of pretending</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
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
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "16px" }}>Dangerous Calling</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "52ch", marginLeft: "auto", marginRight: "auto" }}>
            A book about what happens to the pastor when no one is watching. The most honest book about ministry you will read this year.
          </p>
          <Link href="/books" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--mustard)", color: "var(--ink)", border: "none", padding: "12px 28px", fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", borderRadius: "3px", cursor: "pointer" }}>Browse Books</button>
          </Link>
        </div>
      </section>

      {/* Email Signup */}
      <section style={{ background: "var(--charcoal)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "white", marginBottom: "16px" }}>Get essays for pastors delivered weekly</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "rgba(255,255,255,0.6)", marginBottom: "32px", lineHeight: 1.7 }}>No spam. No guilt. Just writing that takes the weight of your calling seriously.</p>
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
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "16px" }}>Check in with yourself</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "52ch", marginLeft: "auto", marginRight: "auto" }}>
            The Emotional Health tool is a private, honest assessment of where you actually are. No score. No judgment. Just clarity.
          </p>
          <Link href="/tools/emotional-health" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--charcoal)", color: "white", border: "none", padding: "12px 28px", fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", borderRadius: "3px", cursor: "pointer" }}>Take the Assessment</button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
