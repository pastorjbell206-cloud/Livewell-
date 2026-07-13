import { Link } from "wouter";
import { useState } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { LandingSignup } from "@/components/LandingSignup";
import { CrisisHelp } from "@/components/CrisisHelp";

const ARTICLES = [
  { title: "Deconstruction Is Not Destruction", slug: "deconstruction-is-not-destruction" },
  { title: "The Rise of the Nones", slug: "the-rise-of-the-nones" },
  { title: "The Exvangelical Movement", slug: "the-exvangelical-movement" },
  { title: "Reconstructing Faith After Deconstruction", slug: "reconstructing-faith-after-deconstruction" },
  { title: "The Spirituality of Doubt", slug: "the-spirituality-of-doubt" },
  { title: "The Problem with Certainty", slug: "the-problem-with-certainty" },
];

const FAQ_ITEMS = [
  {
    question: "What is faith deconstruction?",
    answer: "Deconstruction is the process of critically examining the beliefs you inherited -- not to destroy faith, but to distinguish between what you were taught and what is actually true. It is not rebellion. It is the refusal to believe something you have not examined."
  },
  {
    question: "Is it a sin to deconstruct your faith?",
    answer: "The Bible is full of people who questioned God -- Abraham argued, Job demanded answers, the Psalms are loaded with lament. Questioning is not sin. It is the beginning of a faith that belongs to you rather than one you borrowed from someone else."
  },
  {
    question: "Can you deconstruct and still be a Christian?",
    answer: "Yes. Deconstruction is not the opposite of faith. Many people who deconstruct find a deeper, more honest Christianity on the other side -- one that does not require them to check their brain at the door. The issue is not whether you question. The issue is whether you are willing to follow the questions honestly."
  },
  {
    question: "What is the difference between deconstruction and deconversion?",
    answer: "Deconstruction is the process of taking apart inherited beliefs to see which ones hold weight. Deconversion is leaving the faith entirely. They are not the same thing, though the church often treats them as if they are. Many people deconstruct and reconstruct a faith that is stronger than what they started with."
  },
  {
    question: "How do I support someone who is deconstructing?",
    answer: "Listen without defending. Ask questions instead of giving answers. Do not treat their doubt as a threat. The worst thing you can do is make someone feel that their honesty has disqualified them from belonging. Presence matters more than arguments."
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQ_ITEMS.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Faith Deconstruction: When Questions Become the Path Forward",
  description: "Honest theology for anyone deconstructing, questioning, or rebuilding their faith. Essays from a pastor who believes your questions are not the enemy.",
  url: "https://www.livewellbyjamesbell.co/deconstruction",
  author: {
    "@type": "Person",
    name: "James Bell",
    url: "https://www.livewellbyjamesbell.co/about",
  },
  publisher: {
    "@type": "Organization",
    name: "LiveWell by James Bell",
  },
};

export default function Deconstruction() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);


  return (
    <Layout>
      <SEOMeta
        title="Faith Deconstruction: When Questions Become the Path Forward"
        description="Honest theology for anyone deconstructing, questioning, or rebuilding their faith. Essays from a pastor who believes your questions are not the enemy."
        keywords="faith deconstruction, deconstructing faith, exvangelical, reconstructing faith, questioning Christianity, leaving church, faith crisis, spiritual doubt"
        structuredData={[faqSchema, webPageSchema]}
      />

      {/* Hero */}
      <section style={{ background: "var(--charcoal)", padding: "clamp(80px,12vw,160px) 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>DECONSTRUCTION</p>
        <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px,5vw,60px)", fontWeight: 400, color: "white", maxWidth: "780px", margin: "0 auto", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          Your questions are not the enemy of faith. They are the beginning of a faith worth having.
        </h1>
        <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "rgba(255,255,255,0.6)", marginTop: "32px", maxWidth: "560px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
          Written by a pastor who came to faith from atheism -- and who believes the questions that scare the church are the same ones that make faith real.
        </p>
      </section>

      {/* Care before content: deconstruction often arrives with real grief and
          isolation — a quiet path to help before the argument. */}
      <CrisisHelp />

      {/* The Landscape */}
      <section style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>WHAT IS HAPPENING</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "40px", marginBottom: "32px" }}>
            <div>
              <p style={{ fontFamily: "var(--F)", fontSize: "48px", fontWeight: 400, color: "var(--ink)", lineHeight: 1 }}>40M</p>
              <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted, #5A5448)", marginTop: "8px", lineHeight: 1.6 }}>American adults have stopped going to church in the last twenty-five years — more than all new converts, restorations, and immigrations combined (The Great Dechurching, Davis and Graham with Burge, 2023).</p>
            </div>
            <div>
              <p style={{ fontFamily: "var(--F)", fontSize: "48px", fontWeight: 400, color: "var(--ink)", lineHeight: 1 }}>29%</p>
              <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted, #5A5448)", marginTop: "8px", lineHeight: 1.6 }}>of American adults now identify as religiously unaffiliated — the "nones" (Pew Research Center, 2021).</p>
            </div>
          </div>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink)", lineHeight: 1.7, maxWidth: "68ch" }}>
            The church has two options. It can treat every question as a threat and circle the wagons. Or it can take the questions seriously and build a faith that does not require intellectual dishonesty to maintain. These essays choose the second path.
          </p>
        </div>
      </section>

      {/* Three Starting Points */}
      <section style={{ background: "var(--bone-warm)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>WHERE ARE YOU</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "32px" }}>Start where you actually are</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <Link href="/writing/deconstruction-is-not-destruction" style={{ textDecoration: "none" }}>
              <div style={{ background: "var(--card)", padding: "24px", borderRadius: "3px", border: "1px solid rgba(0,0,0,0.06)" }}>
                <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "8px" }}>I AM DECONSTRUCTING</p>
                <p style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 400, color: "var(--ink)", marginBottom: "8px" }}>Deconstruction Is Not Destruction</p>
                <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.6 }}>For the person in the middle of it. The thing that feels like falling apart might be the thing that puts you back together.</p>
              </div>
            </Link>
            <Link href="/writing/reconstructing-faith-after-deconstruction" style={{ textDecoration: "none" }}>
              <div style={{ background: "var(--card)", padding: "24px", borderRadius: "3px", border: "1px solid rgba(0,0,0,0.06)" }}>
                <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "8px" }}>I AM REBUILDING</p>
                <p style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 400, color: "var(--ink)", marginBottom: "8px" }}>Reconstructing Faith After Deconstruction</p>
                <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.6 }}>For the person who has taken the old structure down and wants to know if anything worth building remains.</p>
              </div>
            </Link>
            <Link href="/writing/the-rise-of-the-nones" style={{ textDecoration: "none" }}>
              <div style={{ background: "var(--card)", padding: "24px", borderRadius: "3px", border: "1px solid rgba(0,0,0,0.06)" }}>
                <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "8px" }}>I LEFT AND I AM NOT GOING BACK</p>
                <p style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 400, color: "var(--ink)", marginBottom: "8px" }}>The Rise of the Nones</p>
                <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.6 }}>For the person who walked away. This is not a guilt trip. It is an honest look at what you left and why millions are doing the same.</p>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Articles */}
      <section style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>THE ESSAYS</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "32px" }}>Writing that takes your questions seriously</h2>
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

      {/* FAQ */}
      <section style={{ background: "var(--bone-warm)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>COMMON QUESTIONS</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "32px" }}>What people ask about deconstruction</h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  style={{ width: "100%", textAlign: "left", padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer" }}
                  aria-expanded={openFaq === i}
                >
                  <span style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 400, color: "var(--ink)" }}>{item.question}</span>
                  <span style={{ fontFamily: "var(--U)", fontSize: "18px", color: "var(--ink-muted, #5A5448)", flexShrink: 0, marginLeft: "16px" }}>{openFaq === i ? "-" : "+"}</span>
                </button>
                {openFaq === i && (
                  <p style={{ fontFamily: "var(--U)", fontSize: "15px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, paddingBottom: "20px", maxWidth: "64ch" }}>
                    {item.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section style={{ background: "var(--charcoal)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "white", marginBottom: "16px" }}>Get the 7-day Deconstruction Guide</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "rgba(255,255,255,0.6)", marginBottom: "32px", lineHeight: 1.7 }}>Seven days of essays, questions, and Scripture for the person whose faith is coming apart -- or being put back together. No guilt. No conversion bait. Just honest theology.</p>
          <LandingSignup source="landing-deconstruction" />
        </div>
      </section>

      {/* Next Step */}
      <section style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>KEEP READING</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "16px" }}>The full post-Christian series</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "52ch", marginLeft: "auto", marginRight: "auto" }}>
            Deconstruction is one piece of a larger story. Sixty essays tracing what happens when a culture built on Christianity starts to move past it.
          </p>
          <Link href="/post-christian" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--charcoal)", color: "white", border: "none", padding: "12px 28px", fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", borderRadius: "3px", cursor: "pointer" }}>Explore the Full Series</button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
