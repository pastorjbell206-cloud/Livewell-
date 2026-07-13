import { Link } from "wouter";
import { useState } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { LandingSignup } from "@/components/LandingSignup";

const ARTICLES = [
  { title: "Religious Trauma Is Real", slug: "religious-trauma-is-real" },
  { title: "Spiritual Abuse in the Church", slug: "spiritual-abuse-in-the-church" },
  { title: "The Church and Mental Health", slug: "the-church-and-mental-health" },
  { title: "The Wreckage of Purity Culture", slug: "the-wreckage-of-purity-culture" },
  { title: "The Sexual Abuse Crisis in the Church", slug: "the-sexual-abuse-crisis-in-the-church" },
  { title: "How to Find a Church That Won't Hurt You", slug: "how-to-find-a-church-that-wont-hurt-you" },
  { title: "Reconstructing Faith After Deconstruction", slug: "reconstructing-faith-after-deconstruction" },
];

const EXTERNAL_RESOURCES = [
  { name: "GRACE (Godly Response to Abuse in the Christian Environment)", url: "https://www.netgrace.org" },
  { name: "The Courage Network", url: "https://www.thecouragenetwork.org" },
  { name: "988 Suicide & Crisis Lifeline", url: "https://988lifeline.org" },
  { name: "RAINN (Rape, Abuse & Incest National Network)", url: "https://www.rainn.org" },
];

const FAQ_ITEMS = [
  {
    question: "Is it okay to leave a church that hurt me?",
    answer: "Yes. Leaving an institution that caused harm is not a failure of faith. It is a refusal to confuse loyalty to a building with loyalty to God. The church is not the only place God meets you, and staying in a place that does damage to your soul is not what faithfulness requires."
  },
  {
    question: "How do I know if what I experienced was spiritual abuse?",
    answer: "Spiritual abuse involves the misuse of religious authority to control, shame, or manipulate. It includes leaders who demand unquestioning obedience, use Scripture as a weapon, isolate members from outside relationships, or punish doubt and dissent. If your church made you smaller instead of freer, that is worth examining."
  },
  {
    question: "Can I still believe in God after being hurt by the church?",
    answer: "Many people do. But it takes time, and it takes permission to be angry. The distance between God and the people who misrepresented God is real. You do not have to decide right now what you believe. You do have to give yourself permission to heal."
  },
  {
    question: "What is religious trauma?",
    answer: "Religious trauma is the psychological harm caused by toxic religious environments, teachings, or practices. It can produce symptoms similar to PTSD -- anxiety, shame, difficulty trusting, fear of divine punishment. It is a recognized area of psychological study, and it is more common than most churches are willing to admit."
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
  name: "Church Hurt: Resources for Survivors of Spiritual Abuse and Religious Trauma",
  description: "Honest, trauma-informed writing for anyone who has been hurt by the church. Essays on spiritual abuse, religious trauma, purity culture, and the long road to healing.",
  url: "https://www.livewellbyjamesbell.co/church-hurt",
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

export default function ChurchHurt() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);


  return (
    <Layout>
      <SEOMeta
        title="Church Hurt: Resources for Survivors of Spiritual Abuse and Religious Trauma"
        description="Honest, trauma-informed writing for anyone who has been hurt by the church. Essays on spiritual abuse, religious trauma, purity culture, and the long road to healing."
        keywords="church hurt, spiritual abuse, religious trauma, toxic church, purity culture, church abuse, healing from church, leaving toxic church, church and mental health"
        structuredData={[faqSchema, webPageSchema]}
      />

      {/* Hero */}
      <section style={{ background: "var(--charcoal)", padding: "clamp(80px,12vw,160px) 24px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>CHURCH HURT</p>
        <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px,5vw,60px)", fontWeight: 400, color: "white", maxWidth: "780px", margin: "0 auto", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          What happened to you in that church was not God. And naming it is the first step toward healing.
        </h1>
      </section>

      {/* Content Note */}
      <section style={{ background: "var(--bone)", padding: "48px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <div style={{ background: "var(--card)", padding: "24px 28px", borderRadius: "3px", borderLeft: "3px solid var(--mustard)" }}>
            <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "var(--ink)", lineHeight: 1.7 }}>
              <strong>A note before you read.</strong> These essays deal with spiritual abuse, religious trauma, sexual abuse in the church, and the damage done by toxic theology. If you are in crisis, please reach out to the 988 Suicide & Crisis Lifeline (call or text 988). You are not alone, and there is no shame in asking for help.
            </p>
          </div>
        </div>
      </section>

      {/* What Happened */}
      <section style={{ background: "var(--bone)", padding: "40px 24px 80px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>THE TRUTH</p>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink)", lineHeight: 1.7, maxWidth: "68ch", marginBottom: "24px" }}>
            The church was supposed to be the safest place. For too many people, it became the most dangerous. Pastors who used their authority as a weapon. Purity culture that taught shame instead of dignity. Congregations that punished honesty and rewarded performance.
          </p>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink)", lineHeight: 1.7, maxWidth: "68ch" }}>
            These essays do not defend the institution. They do not ask you to forgive on someone else's timeline. They name what happened, why it happened, and what healing actually requires. Written by a pastor who believes the church owes more than apologies -- it owes accountability.
          </p>
        </div>
      </section>

      {/* Featured Articles */}
      <section style={{ background: "var(--bone-warm)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>THE ESSAYS</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "32px" }}>Writing that names the thing the church will not name</h2>
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

      {/* FAQ */}
      <section style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>QUESTIONS PEOPLE CARRY</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "32px" }}>You are not the only one asking this</h2>
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

      {/* External Resources */}
      <section style={{ background: "var(--bone-warm)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>RESOURCES</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "16px" }}>Organizations that can help</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "15px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, marginBottom: "32px" }}>These are external organizations that specialize in supporting survivors of church-related abuse and trauma. We are not affiliated with them, but we trust their work.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
            {EXTERNAL_RESOURCES.map((r) => (
              <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <div style={{ background: "var(--card)", padding: "20px 24px", borderRadius: "3px", border: "1px solid rgba(0,0,0,0.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--U)", fontSize: "15px", color: "var(--ink)" }}>{r.name}</span>
                  <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--mustard-text)" }}>Visit</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Email Signup */}
      <section style={{ background: "var(--charcoal)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "white", marginBottom: "16px" }}>Writing that does not look away</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "14px", color: "rgba(255,255,255,0.6)", marginBottom: "32px", lineHeight: 1.7 }}>Weekly essays on what the church owes, what healing requires, and what faith looks like after the institution has failed you.</p>
          <LandingSignup source="landing-church-hurt" />
        </div>
      </section>

      {/* Next Step */}
      <section style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>WHEN YOU ARE READY</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--ink)", marginBottom: "16px" }}>Finding a church that will not hurt you</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "var(--ink-muted, #5A5448)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "52ch", marginLeft: "auto", marginRight: "auto" }}>
            Not everyone will go back to church. That is okay. But if you want to, this essay names what to look for and what to avoid.
          </p>
          <Link href="/writing/how-to-find-a-church-worth-joining" style={{ textDecoration: "none" }}>
            <button style={{ background: "var(--charcoal)", color: "white", border: "none", padding: "12px 28px", fontSize: "14px", fontWeight: 600, fontFamily: "var(--U)", borderRadius: "3px", cursor: "pointer" }}>Read the Essay</button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
