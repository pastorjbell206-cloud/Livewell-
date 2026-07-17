import { Link } from "wouter";
import { useState } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { LandingSignup } from "@/components/LandingSignup";

const ARTICLES = [
  { title: "Is God Real?", href: "/faq/does-god-exist" },
  { title: "Why Does God Allow Suffering?", href: "/writing/apologetics-why-does-god-allow-evil" },
  { title: "Is the Bible Reliable?", href: "/faq/is-the-bible-historically-accurate" },
  { title: "What About Other Religions?", href: "/writing/apologetics-what-about-those-who-never-heard" },
  { title: "Has Science Disproved God?", href: "/faq/can-science-and-faith-coexist" },
  { title: "Why Is the Church So Hypocritical?", href: "/writing/apologetics-hasnt-the-church-done-terrible-things" },
  { title: "Is Hell Real?", href: "/faq/what-do-christians-believe-about-hell" },
  { title: "Can I Doubt and Still Have Faith?", href: "/doubt" },
  { title: "What About the Violence in the Old Testament?", href: "/skeptic-track" },
  { title: "Does Christianity Oppress Women?", href: "/writing/the-womanhood-they-preached-was-small" },
];

const FAQ_ITEMS = [
  {
    question: "Is it okay to question God?",
    answer: "The Bible is not a book written by people who had no questions. Abraham argued with God. Moses pushed back. Job demanded an answer. The Psalms are loaded with complaint, anger, and doubt. If God cannot handle your questions, God is not God."
  },
  {
    question: "Why does God allow suffering?",
    answer: "This is the hardest question in theology, and anyone who offers a clean answer is not taking it seriously. The Bible does not give a philosophical explanation for suffering. It gives something else -- a God who enters suffering rather than explaining it away. That is not a complete answer. It is the beginning of one."
  },
  {
    question: "Has science disproved Christianity?",
    answer: "Science answers how the universe works. Theology asks why it exists at all. The idea that science and faith are at war is a story told by people who need them to be -- on both sides. The actual history of science and Christianity is far more entangled than either fundamentalists or militant atheists want to admit."
  },
  {
    question: "How can you believe the Bible is reliable?",
    answer: "The Bible is the most scrutinized collection of ancient documents in human history. The manuscript evidence, the archaeological record, and the internal coherence of its claims are worth examining on their own terms -- not dismissed because of what a bad preacher did with them. These essays lay out the evidence and let you decide."
  },
  {
    question: "Why are there so many denominations?",
    answer: "Because Christians disagree. That is either a scandal or a sign that the tradition is big enough to contain serious debate. The real question is not why there are so many denominations, but what the core claims are that hold across all of them -- and whether those claims are true."
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
  name: "Honest Questions About Christianity: Essays for Skeptics and Seekers",
  description: "Ten hard questions about God, the Bible, suffering, and the church -- answered without flinching. Written by a pastor who came to faith from atheism.",
  url: "https://www.livewellbyjamesbell.co/honest-questions",
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

export default function HonestQuestions() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);


  return (
    <Layout>
      <SEOMeta
        title="Honest Questions About Christianity: Essays for Skeptics and Seekers"
        description="Ten hard questions about God, the Bible, suffering, and the church -- answered without flinching. Written by a pastor who came to faith from atheism."
        keywords="is God real, why does God allow suffering, is the Bible reliable, questions about Christianity, doubting faith, skeptic, does God exist, hard questions about faith"
        structuredData={[faqSchema, webPageSchema]}
      />

      {/* Hero */}
      <section style={{ background: "var(--charcoal)", padding: "clamp(80px,12vw,160px) 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>FOR THE HONEST</p>
        <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px,5vw,60px)", fontWeight: 400, color: "var(--charcoal-fg)", maxWidth: "780px", margin: "0 auto", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          The Bible was written by people who argued with God. You are allowed to ask questions.
        </h1>
        <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "rgba(255,255,255,0.6)", marginTop: "32px", maxWidth: "560px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
          Written by a former atheist who asked every one of these questions before he believed a word of the gospel. No cliches. No bait-and-switch. Just honest engagement with the hardest objections to Christianity.
        </p>
      </section>

      {/* The Promise */}
      <section style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>WHAT YOU WILL FIND HERE</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "32px", marginBottom: "32px" }}>
            <div>
              <p style={{ fontFamily: "var(--F)", fontSize: "22px", fontWeight: 400, color: "var(--ink)", marginBottom: "8px" }}>No dishonest answers</p>
              <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.6 }}>Every essay acknowledges what the objection gets right before examining what it misses. We are not interested in winning arguments. We are interested in the truth.</p>
            </div>
            <div>
              <p style={{ fontFamily: "var(--F)", fontSize: "22px", fontWeight: 400, color: "var(--ink)", marginBottom: "8px" }}>No conversion pressure</p>
              <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.6 }}>These essays were not written to get you to pray a prayer at the end. They were written to take your question seriously and give you something worth thinking about.</p>
            </div>
          </div>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink)", lineHeight: 1.7, maxWidth: "68ch" }}>
            The church has a bad reputation for answering hard questions with bumper stickers. These essays do the opposite. They go long. They name the strongest version of the objection. And they let you decide what to do with the answer.
          </p>
        </div>
      </section>

      {/* The Questions */}
      <section style={{ background: "var(--bone-warm)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>THE TEN HARDEST QUESTIONS</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "32px" }}>Pick the question that keeps you up at night</h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {ARTICLES.map((a) => (
              <Link key={a.href} href={a.href} style={{ textDecoration: "none" }}>
                <div style={{ padding: "20px 0", borderBottom: "1px solid rgba(0,0,0,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 400, color: "var(--ink)" }}>{a.title}</span>
                  <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--mustard-text)" }}>Read</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>QUICK ANSWERS</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "32px" }}>What people ask before they start reading</h2>
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

      {/* Deep Bible CTA */}
      <section style={{ background: "var(--bone-warm)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>GO DEEPER</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "16px" }}>Study the text yourself</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "52ch", marginLeft: "auto", marginRight: "auto" }}>
            The Deep Bible Companion walks you through any passage with historical context, original language, and the scholarly debates most preachers skip. No pre-packaged answers.
          </p>
          <Link href="/tools/deep-bible" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", border: "none", padding: "12px 28px", fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", borderRadius: "3px", cursor: "pointer" }}>Open the Deep Bible Companion</button>
          </Link>
        </div>
      </section>

      {/* Email Signup */}
      <section style={{ background: "var(--charcoal)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--charcoal-fg)", marginBottom: "16px" }}>One hard question. One honest answer. Every week.</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "rgba(255,255,255,0.6)", marginBottom: "32px", lineHeight: 1.7 }}>Essays for skeptics, seekers, and anyone who refuses to believe something they have not examined. No guilt. No pressure. Just theology that takes your intelligence seriously.</p>
          <LandingSignup source="landing-honest-questions" />
        </div>
      </section>

      {/* Next Step */}
      <section style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>THE BIGGER PICTURE</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "16px" }}>These questions are part of a larger story</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "52ch", marginLeft: "auto", marginRight: "auto" }}>
            The post-Christian series traces sixty essays on what happens when a culture built on Christianity starts asking whether any of it is true.
          </p>
          <Link href="/post-christian" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--charcoal)", color: "var(--charcoal-fg)", border: "none", padding: "12px 28px", fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", borderRadius: "3px", cursor: "pointer" }}>Explore the Full Series</button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
