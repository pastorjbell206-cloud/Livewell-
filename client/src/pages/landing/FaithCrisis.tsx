import { Link } from "wouter";
import { useState } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const ARTICLES = [
  { title: "When Fear Rewrites Theology", slug: "when-fear-rewrites-theology" },
  { title: "When God Doesn't Make Sense", slug: "when-god-doesnt-make-sense" },
  { title: "What If We're Wrong?", slug: "what-if-we-are-wrong" },
  { title: "The Dark Night of the Soul When God Feels Absent", slug: "dark-night-god-feels-absent" },
  { title: "Constantine's Bargain", slug: "constantines-bargain" },
];

export default function FaithCrisis() {
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
        title="Faith Crisis"
        description="When the faith you were given stops holding weight. Essays for the honest, the doubting, and the ones who refuse to stop asking."
        keywords="faith crisis, doubt, deconstruction, theology, questioning faith"
      />

      {/* Hero */}
      <section style={{ background: "var(--charcoal)", padding: "clamp(80px,12vw,160px) 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>FAITH AND DOUBT</p>
        <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px,5vw,60px)", fontWeight: 400, color: "white", maxWidth: "780px", margin: "0 auto", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          When the faith you were given stops holding weight.
        </h1>
      </section>

      {/* Stats */}
      <section style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>YOU ARE NOT ALONE</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px", marginBottom: "32px" }}>
            <div>
              <p style={{ fontFamily: "var(--F)", fontSize: "48px", fontWeight: 400, color: "var(--ink)", lineHeight: 1 }}>65%</p>
              <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted, #5A5448)", marginTop: "8px", lineHeight: 1.6 }}>of young adults raised in church report a season of serious doubt about their faith.</p>
            </div>
            <div>
              <p style={{ fontFamily: "var(--F)", fontSize: "48px", fontWeight: 400, color: "var(--ink)", lineHeight: 1 }}>1 in 3</p>
              <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted, #5A5448)", marginTop: "8px", lineHeight: 1.6 }}>adults say they left a church because their questions were not welcome.</p>
            </div>
          </div>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink)", lineHeight: 1.7, maxWidth: "68ch" }}>
            Doubt is not the opposite of faith. It is the immune system of a faith that refuses to be shallow. These essays do not offer easy resolution. They offer company for the long road.
          </p>
        </div>
      </section>

      {/* Featured Articles */}
      <section style={{ background: "var(--bone-warm)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>START READING</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "32px" }}>Essays for the questions you were told not to ask</h2>
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
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "16px" }}>The Monster in the Mirror</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "52ch", marginLeft: "auto", marginRight: "auto" }}>
            A book about what you find when you stop running from your own reflection. For anyone whose faith has become a mirror they are afraid to look into.
          </p>
          <Link href="/books" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--mustard)", color: "var(--ink)", border: "none", padding: "12px 28px", fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", borderRadius: "3px", cursor: "pointer" }}>Browse Books</button>
          </Link>
        </div>
      </section>

      {/* Email Signup */}
      <section style={{ background: "var(--charcoal)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "white", marginBottom: "16px" }}>Writing for the questions that keep you up at night</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "rgba(255,255,255,0.6)", marginBottom: "32px", lineHeight: 1.7 }}>Weekly essays on faith, doubt, and what it means to believe with your eyes open.</p>
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
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "16px" }}>Study the text yourself</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "52ch", marginLeft: "auto", marginRight: "auto" }}>
            The Bible Study tool walks you through any passage with historical context, original language, and honest questions. No pre-packaged answers.
          </p>
          <Link href="/tools/bible-study" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--charcoal)", color: "white", border: "none", padding: "12px 28px", fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", borderRadius: "3px", cursor: "pointer" }}>Open Bible Study Tool</button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
