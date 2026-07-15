import { Link } from "wouter";
import { useState } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const FAQ_ITEMS = [
  {
    question: "What does deconstruction mean in Christianity?",
    answer:
      "Deconstruction, in the way most people use the term, refers to the process of critically re-examining beliefs, practices, and assumptions that were inherited rather than chosen. It is the moment when someone stops accepting what they were taught because they were taught it and starts asking whether it is true. The term itself comes from the philosopher Jacques Derrida, but the popular usage has moved far from Derrida's technical meaning. In Christian circles, deconstruction usually describes a person pulling apart the particular version of Christianity they received -- often the evangelicalism of the American church growth movement -- and asking which parts are the gospel and which parts are cultural packaging. Some people deconstruct specific doctrines: hell, inerrancy, penal substitutionary atonement. Others deconstruct entire systems: purity culture, Christian nationalism, complementarianism. The process is rarely tidy. It usually begins with a crisis -- a moral failure by a leader, an intellectual question that received a dismissive answer, an experience of suffering that exposed the inadequacy of the theology offered. Deconstruction is not inherently destructive. It is the theological equivalent of a renovation. You have to tear out the walls to find out which ones are load-bearing. The problem comes when people tear out everything and never rebuild, or when the church treats the renovation itself as betrayal.",
  },
  {
    question: "Is deconstruction the same as losing your faith?",
    answer:
      "No. But the church has done a remarkably effective job of conflating the two, and that conflation has driven people away who might otherwise have stayed. Deconstruction is the process of questioning inherited beliefs. Losing faith is abandoning belief in God entirely. They can overlap, but they are not the same thing. Many people who deconstruct end up with a deeper, more resilient faith -- one they chose rather than inherited, one tested by honest questions rather than protected from them. The history of Christian theology is largely a history of deconstruction. The Reformation was deconstruction. The early church councils that hammered out the creeds were deconstruction -- tearing apart inadequate formulations to find the truth underneath. Augustine deconstructed Manichaean dualism. Aquinas deconstructed Platonic idealism. Bonhoeffer deconstructed cheap grace. The church has always reformed itself by questioning what it assumed. The difference today is that the people doing the questioning are ordinary believers rather than theologians with institutional protection. When a seminary professor questions inerrancy, it is called scholarship. When a twenty-six-year-old in a megachurch does it, it is called falling away. That double standard tells you more about the institution than about the person asking the question.",
  },
  {
    question: "Is deconstruction biblical?",
    answer:
      "The word is not in the Bible, but the practice runs through it like a nerve. Abraham questioned God's justice before the destruction of Sodom. Moses argued with God repeatedly. Job demanded an audience with the Almighty and refused to accept his friends' theological explanations for his suffering -- and at the end of the book, God told Job's friends they were wrong. The Psalms contain some of the most devastating theological protest literature ever written. Psalm 88 ends in darkness with no resolution. Psalm 44 accuses God of selling his people for nothing. The prophets deconstructed the religious establishment of their day with a ferocity that would get them banned from most modern churches. Jesus himself deconstructed the religious system he inherited. \"You have heard it said, but I say to you\" is a deconstruction formula. He dismantled purity codes, Sabbath legalism, temple economics, and the entire apparatus of religious power that had accumulated around the covenant. Paul deconstructed the requirement of circumcision, the dietary laws, and the ethnic boundaries of God's people. The Bible is not a book that protects inherited assumptions. It is a book that repeatedly tears them apart in the service of something truer. The question is never whether deconstruction is biblical. The question is whether yours is heading somewhere or just tearing things down for the sake of it.",
  },
  {
    question: "What are the stages of faith deconstruction?",
    answer:
      "There is no official roadmap, but most people who have been through it describe a recognizable pattern. The first stage is usually a trigger -- a moral failure by a leader, a question that received a dismissive answer, an experience that the existing theology could not account for, or exposure to information that contradicts what was taught. The second stage is doubt -- not the comfortable kind that sermons address, but the kind that makes you feel like the floor is giving way. This is the stage where most people feel the most alone, because the community they trusted often treats their questions as threats. The third stage is deconstruction proper -- actively pulling apart beliefs, examining them, reading outside the approved list, listening to voices that were previously off-limits. This stage often involves anger, grief, and a sense of betrayal. The fourth stage is a wilderness period -- a time when the old framework is gone but nothing has replaced it. This is the most dangerous stage, because the temptation is either to rush back to what was comfortable or to abandon the project entirely. The fifth stage, for those who continue, is reconstruction -- building a faith that can hold the weight of the questions that started the process. Not everyone reaches this stage. Some remain in the wilderness permanently. Some find their way to something new. The church bears responsibility for how many people get stuck, because the church is often the reason they cannot find their way through.",
  },
  {
    question: "How long does deconstruction take?",
    answer:
      "There is no timeline, and anyone who offers one is underestimating the process. For some people, deconstruction happens over months -- a concentrated period of reading, questioning, and rethinking that produces a reconfigured faith relatively quickly. For others, it takes years or even decades. The duration depends on several factors: how deeply the inherited beliefs were embedded, how much of your identity and community was built around them, whether the trigger was intellectual or traumatic, and whether you have access to resources and relationships that support honest questioning. A person deconstructing after clergy abuse may need years of therapy before they can even approach theological questions. A person whose deconstruction is primarily intellectual -- someone who encountered the problem of suffering in a philosophy class -- may work through it faster, but the emotional dimensions often take longer than the intellectual ones. The church tends to treat deconstruction as a phase that should resolve quickly, which adds pressure to a process that cannot be rushed. Grief does not follow a schedule. Neither does the rebuilding of a worldview. The most honest answer is: it takes as long as it takes, and the people who try to shortcut it usually end up doing it twice.",
  },
  {
    question: "Can you deconstruct and still be a Christian?",
    answer:
      "Yes. In fact, some of the most robust Christians in history are people who tore apart their inherited faith and rebuilt it on firmer ground. The question assumes that Christianity is a static set of propositions that you either accept wholesale or reject entirely. But Christianity has never worked that way. The tradition contains enormous internal diversity -- Eastern Orthodoxy, Roman Catholicism, mainline Protestantism, evangelicalism, Pentecostalism, the Anabaptist traditions -- and movement between these streams is not apostasy. It is theological growth. Many people who deconstruct do not leave Christianity. They leave a particular version of it -- often the version that conflated the gospel with American culture, Republican politics, purity culture, or prosperity theology. What they find on the other side is frequently a Christianity that is older, deeper, and more demanding than what they left. They discover the church fathers, the contemplative tradition, the social gospel, liberation theology, the rich intellectual history that their particular tradition either ignored or actively suppressed. The danger is real -- some people deconstruct into nothing, and that is a genuine loss. But the church created many of the conditions that made deconstruction necessary. The remedy is not to prevent people from questioning. It is to give them something worth questioning toward.",
  },
  {
    question: "What does reconstruction look like after deconstruction?",
    answer:
      "Reconstruction is the work of building a faith that can carry the weight of the questions that dismantled the old one. It does not look like going back. It looks like going through. For many people, reconstruction involves returning to the primary sources -- reading the Bible without the interpretive framework they were given, encountering the text as if for the first time. It often involves reading church history and discovering that the version of Christianity they inherited was not the only version, and frequently not the oldest. It involves engaging with theologians from different traditions -- someone raised Baptist might find their way through an Orthodox liturgy, a contemplative practice, or a Catholic intellectual tradition. Reconstruction also involves finding community, which is often the hardest part. The old community may have rejected the person for asking questions. Finding a new one requires vulnerability, and vulnerability requires trust, which is exactly what deconstruction eroded. The reconstructed faith tends to hold certain convictions more loosely and others more tightly. Peripheral doctrinal distinctions matter less. The core -- the character of God, the resurrection, the call to love the neighbor -- matters more. Reconstruction is not a return to certainty. It is a faith that has learned to live with ambiguity without losing its center. It is harder than the faith it replaced. It is also harder to take away.",
  },
  {
    question: "What resources help with faith deconstruction?",
    answer:
      "The best resources are the ones that take both the questions and the faith seriously -- that refuse to dismiss the doubts as weakness but also refuse to treat abandonment as courage. In terms of books: Peter Enns's \"The Sin of Certainty\" addresses the evangelical obsession with right beliefs. Rachel Held Evans's \"Faith Unraveled\" traces one woman's honest account of her own deconstruction. Richard Rohr's \"Falling Upward\" provides a contemplative framework for the process. For the intellectually rigorous: James K.A. Smith's \"How (Not) to Be Secular\" engages Charles Taylor's work on secularism in accessible terms. Marilynne Robinson's essays in \"The Givenness of Things\" model what it looks like to be both intellectually demanding and deeply faithful. For the historically minded: Diarmaid MacCulloch's \"Christianity: The First Three Thousand Years\" reveals how diverse and contentious the tradition has always been. In terms of community: The Liturgists podcast, though now ended, has archived episodes that many people found companioning. Therapy -- specifically with a counselor trained in religious trauma -- is not optional for people whose deconstruction involves abuse or spiritual manipulation. And honest conversation with people who have been through it. Not people who want to fix you. People who will sit with you in the wreckage and help you sort through what is worth keeping. That is what the church should be. That is what it too rarely is.",
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
  name: "What Is Deconstruction? 8 Honest Answers for Christians",
  description:
    "What does faith deconstruction mean? Is it biblical? Can you deconstruct and stay Christian? A pastor answers the questions the church avoids.",
  url: "https://www.livewellbyjamesbell.co/faq/what-is-deconstruction",
  author: { "@type": "Person", name: "James Bell", url: "https://www.livewellbyjamesbell.co/about" },
  publisher: { "@type": "Organization", name: "LiveWell by James Bell" },
};

export default function WhatIsDeconstruction() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      <SEOMeta
        title="What Is Deconstruction? 8 Honest Answers for Christians"
        description="What does faith deconstruction mean? Is it biblical? Can you deconstruct and stay Christian? A pastor answers the questions the church avoids."
        keywords="what is deconstruction, faith deconstruction, deconstruction Christianity, stages of deconstruction, is deconstruction biblical, leaving faith, reconstruction"
        structuredData={[faqSchema, webPageSchema]}
      />

      <section style={{ background: "var(--charcoal)", padding: "clamp(80px,12vw,160px) 24px 64px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>PEOPLE ALSO ASK</p>
        <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px,5vw,60px)", fontWeight: 400, color: "var(--charcoal-fg)", maxWidth: "780px", margin: "0 auto", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          What is deconstruction?
        </h1>
        <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "rgba(255,255,255,0.6)", marginTop: "32px", maxWidth: "560px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
          The word has become a flashpoint. For some it means spiritual growth. For others it means apostasy. The truth is more complicated than either side wants it to be.
        </p>
      </section>

      <section style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>8 QUESTIONS ANSWERED</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  style={{ width: "100%", textAlign: "left", padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer" }}
                >
                  <h2 style={{ fontFamily: "var(--F)", fontSize: "20px", fontWeight: 400, color: "var(--ink)", margin: 0 }}>{item.question}</h2>
                  <span style={{ fontFamily: "var(--U)", fontSize: "18px", color: "var(--ink-muted)", flexShrink: 0, marginLeft: "16px", transition: "transform 200ms var(--ease)", transform: openFaq === i ? "rotate(45deg)" : "none" }}>+</span>
                </button>
                {openFaq === i && (
                  <div style={{ paddingBottom: "24px" }}>
                    <p style={{ fontFamily: "var(--B)", fontSize: "15px", color: "var(--ink-muted)", lineHeight: 1.75, maxWidth: "64ch" }}>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{ background: "var(--charcoal)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>GO DEEPER</p>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--charcoal-fg)", marginBottom: "16px" }}>Read the full essay</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "48ch", marginLeft: "auto", marginRight: "auto" }}>
            The full article examines deconstruction through the lens of church history, pastoral theology, and the real stories of people who went through it.
          </p>
          <Link href="/deconstruction" style={{ textDecoration: "none" }}>
            <span style={{ display: "inline-block", background: "var(--bone)", color: "var(--ink)", fontFamily: "var(--U)", fontSize: "13px", fontWeight: 600, letterSpacing: "0.06em", padding: "15px 32px", borderRadius: "2px", borderBottom: "2px solid var(--mustard)" }}>
              Read the full article
            </span>
          </Link>
        </div>
      </section>

      <section style={{ background: "var(--bone-warm)", padding: "64px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>RELATED QUESTIONS</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {[
              { label: "Why are people leaving the church?", href: "/faq/why-are-people-leaving-church" },
              { label: "What is religious trauma?", href: "/faq/what-is-religious-trauma" },
              { label: "Can science and faith coexist?", href: "/faq/can-science-and-faith-coexist" },
            ].map((link) => (
              <Link key={link.href} href={link.href} style={{ textDecoration: "none" }}>
                <div style={{ padding: "16px 0", borderBottom: "1px solid rgba(0,0,0,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontFamily: "var(--F)", fontSize: "18px", fontWeight: 400, color: "var(--ink)" }}>{link.label}</span>
                  <span style={{ fontFamily: "var(--U)", fontSize: "13px", color: "var(--mustard-text)" }}>Read</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
