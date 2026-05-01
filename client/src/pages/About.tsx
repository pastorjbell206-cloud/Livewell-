import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";

const PORTRAIT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_4533_137f3486.jpeg";

export default function About() {
  return (
    <Layout>
      <SEOMeta
        title="About James Bell — Pastor, Author, Writer"
        description="From atheism to the pulpit. Raised without a father. Five sons. 25 books. 15 years in ministry. The story behind the writing."
        type="website"
      />

      {/* ORIGIN */}
      <section style={{ background: "var(--charcoal)", padding: "6rem 1.5rem 5rem" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <div style={{ fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--mustard)", fontFamily: "var(--U)", marginBottom: "2rem" }}>About</div>

          <div style={{ display: "flex", gap: "2.5rem", alignItems: "flex-start", flexWrap: "wrap", marginBottom: "3rem" }}>
            <img src={PORTRAIT} alt="James Bell" loading="eager" style={{ width: "160px", height: "210px", objectFit: "cover", objectPosition: "center top", borderRadius: "2px", border: "1px solid rgba(244,241,234,0.1)", flexShrink: 0 }} />
            <div style={{ flex: 1, minWidth: "260px" }}>
              <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--bone)", marginBottom: "1rem" }}>James Bell</h1>
              <p style={{ fontSize: "0.875rem", color: "var(--bone)", opacity: 0.5, fontFamily: "var(--U)", lineHeight: 1.5 }}>
                Lead Pastor, First Baptist Church of Fenton<br />
                Founder, Pastors Connection Network<br />
                Author of 25 books
              </p>
            </div>
          </div>

          <div style={{ fontFamily: "var(--F)", fontSize: "1.125rem", lineHeight: 1.75, color: "var(--bone)", opacity: 0.85 }}>
            <p style={{ marginBottom: "1.5rem" }}>
              The first honest prayer I ever prayed was an argument. I was twenty-three, an atheist by conviction, and I was losing the argument with a God I did not believe in. That is not a testimony. It is a fact. The intellectual position I had held for years — that faith was a category error made by people who could not face the absence of meaning — collapsed not under emotional pressure but under the weight of its own assumptions. I did not find God. I ran out of reasons to pretend the evidence pointed nowhere.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              I was raised without a father. That is not background. It is architecture. It shaped what I hear when Scripture speaks of a Father who does not leave. It shaped what I refuse to tolerate in a church culture that sentimentalizes fatherhood while ignoring the men who never had one. It shaped the way I raise my five sons — not with the confidence of a man who knows what he is doing, but with the terror of a man who knows what happens when no one does it at all.
            </p>
            <p style={{ marginBottom: "1.5rem" }}>
              This is not a platform built on certainty. It is built on the conviction that certainty is often the enemy of honest faith — and that the church needs voices willing to name what they see, even when what they see is the church itself failing the people it was supposed to serve.
            </p>
          </div>
        </div>
      </section>

      {/* THE WORK */}
      <section style={{ background: "var(--bone)", padding: "5rem 1.5rem" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <div style={{ width: "40px", height: "2px", background: "var(--mustard)", marginBottom: "2rem" }} />
          <p style={{ fontFamily: "var(--F)", fontSize: "1.125rem", lineHeight: 1.75, color: "var(--ink)", marginBottom: "2rem" }}>
            LiveWell exists for the reader whose faith has outgrown the answers they were given. For the pastor burning out in silence. For the couple keeping vows they no longer understand. For the skeptic who cannot stop reading the words of a tradition they are not sure they believe in. The writing connects the depth of theology — Keller's architecture, Brueggemann's prophetic imagination, Peterson's pastoral texture, Bonhoeffer's willingness to name the thing at cost — to the weight of an actual Tuesday afternoon.
          </p>

          <h2 style={{ fontFamily: "var(--F)", fontSize: "1.5rem", fontWeight: 400, color: "var(--ink)", marginBottom: "2rem" }}>What the work carries</h2>

          {[
            { name: "The full arc", def: "Every essay starts at the root, not the symptom. The church's failure to speak on justice did not begin in 2020. It began with Constantine. The marriage that is drifting did not start with the argument last Tuesday. It started with the vow neither partner understood when they made it." },
            { name: "Self-implication", def: "The writer is inside the indictment. When the essay names what the church has gotten wrong, the writer is part of the church that got it wrong. When the essay names what pastors hide, the writer is a pastor who has hidden it." },
            { name: "Verdicts, not summaries", def: "The last paragraph does not restate the thesis. It names what remains after the evidence has been laid out. Three to eight words. The reader carries it out of the room." },
          ].map((v, i) => (
            <div key={i} style={{ marginBottom: "2rem" }}>
              <h3 style={{ fontFamily: "var(--F)", fontSize: "1.125rem", fontWeight: 500, fontStyle: "italic", color: "var(--ink)", marginBottom: "0.5rem" }}>{v.name}</h3>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--ink-muted)" }}>{v.def}</p>
            </div>
          ))}
        </div>
      </section>

      {/* WHAT WE ARE NOT */}
      <section style={{ background: "var(--bone-warm)", padding: "4rem 1.5rem" }}>
        <div style={{ maxWidth: "680px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--F)", fontSize: "1.125rem", lineHeight: 1.75, color: "var(--ink)" }}>
            LiveWell is not therapy. It is not a Christian self-help platform. It is not a place to be told what to think. It is not gospel-centered slogan content dressed in better fonts. It is a writing desk where a pastor with fifteen years of failure and five sons he is trying not to ruin thinks out loud about what it means to follow Jesus in a culture that has forgotten what his kingdom actually stands for.
          </p>
        </div>
      </section>

      {/* CLOSING */}
      <section style={{ background: "var(--charcoal)", padding: "5rem 1.5rem", textAlign: "center" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <div style={{ width: "40px", height: "2px", background: "var(--mustard)", margin: "0 auto 2rem" }} />
          <p style={{ fontFamily: "var(--F)", fontSize: "1.125rem", lineHeight: 1.65, color: "var(--bone)", fontStyle: "italic", marginBottom: "2rem" }}>
            You are still deciding whether to trust the voice. That is the right instinct. The writing will either carry weight for you or it will not. Begin where you are.
          </p>
          <Link href="/writing" style={{ fontFamily: "var(--U)", fontSize: "0.875rem", fontWeight: 500, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "0.25rem" }}>
            Read the writing <ArrowRight size={14} style={{ display: "inline", verticalAlign: "middle" }} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
