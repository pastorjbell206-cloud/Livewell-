import { Link } from "wouter";
import { useState } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const FAQ_ITEMS = [
  {
    question: "Are science and religion in conflict?",
    answer:
      "The narrative of inevitable conflict between science and religion was constructed in the late nineteenth century by two books: John William Draper's \"History of the Conflict Between Religion and Science\" (1874) and Andrew Dickson White's \"A History of the Warfare of Science with Theology in Christendom\" (1896). Historians of science have spent the last fifty years dismantling the Draper-White thesis, and the consensus among scholars who study the actual relationship between science and religion is that it is far more complex, far more cooperative, and far less adversarial than the popular narrative suggests. The medieval church preserved classical learning through its monasteries and universities. The first European universities -- Bologna, Paris, Oxford -- were founded by the church and devoted significant resources to the study of natural philosophy (what we now call science). The Jesuits ran a global network of observatories. The Pontifical Academy of Sciences, founded in 1603, is one of the oldest scientific institutions in the world. Roger Bacon, Albertus Magnus, Robert Grosseteste -- these were churchmen and scientists simultaneously. The cases most often cited as evidence of conflict -- Galileo and Darwin -- are more complicated than the textbook versions suggest. Galileo's conflict was as much political as theological. Darwin's reception was divided, with some clergy embracing evolution immediately and some scientists rejecting it. The narrative of warfare is useful for polemicists on both sides. It is not supported by the historical record.",
  },
  {
    question: "What about evolution? Can Christians believe in evolution?",
    answer:
      "Many do, and they are not compromising their faith to do so. The range of Christian positions on evolution includes young earth creationism (the earth is 6,000-10,000 years old, Genesis 1 describes literal 24-hour days), old earth creationism (the earth is billions of years old, but God intervened directly in the creation of life), intelligent design (certain biological structures are too complex to have arisen through natural processes alone), and theistic evolution or evolutionary creationism (God created through the evolutionary process, and Genesis describes theological truths about creation rather than scientific mechanisms). The last position is held by a significant portion of Christian scholarship, including the BioLogos Foundation (founded by Francis Collins), many Catholic theologians (since Pius XII's 1950 encyclical Humani Generis, and more explicitly under John Paul II and Francis), and the majority of mainline Protestant scholars. The key question is not whether evolution happened -- the evidence for common descent is overwhelming and accepted by virtually all working biologists -- but what it means theologically. Is the universe purposeful or accidental? Is humanity the product of divine intention or cosmic chance? Is there a creator behind the process? These are not scientific questions. They are philosophical and theological ones. Science describes the mechanism. Theology asks about the meaning. A Christian can accept the mechanism and still affirm the meaning. Many of the most serious Christian thinkers in history have done exactly that.",
  },
  {
    question: "Can scientists believe in God?",
    answer:
      "They can, and the historical record makes the question almost absurd. The scientific revolution was launched by people who believed in God, and who pursued science because they believed in God -- because they believed the universe was rational, orderly, and comprehensible, and that investigating it was a form of worship. Copernicus was a Catholic canon. Kepler called astronomy \"thinking God's thoughts after him.\" Newton devoted more pages to theology than to physics. Boyle endowed a lecture series to defend Christianity. Faraday was a devout Sandemanian. Maxwell was a committed Presbyterian. Mendel was an Augustinian friar. Lemaitre, who proposed the Big Bang theory, was a Catholic priest. In the contemporary world, Francis Collins led the Human Genome Project and identifies as an evangelical Christian. John Polkinghorne was a Cambridge particle physicist before becoming an Anglican priest. Ard Louis is a professor of theoretical physics at Oxford and a Christian. Jennifer Wiseman is a senior astrophysicist at NASA and an active believer. The 2009 Pew survey of American Association for the Advancement of Science members found that 51% believe in God or a higher power. A 2016 study by Elaine Howard Ecklund found that scientists are more religious than the stereotype suggests, with many practicing faith privately. The claim that scientific knowledge inevitably leads to atheism is a philosophical assertion, not an empirical finding. The evidence -- both historical and contemporary -- contradicts it.",
  },
  {
    question: "What about miracles? Can science explain miracles?",
    answer:
      "Science, by its methodological commitments, cannot adjudicate claims about miracles one way or the other, and understanding why requires understanding what science is and is not. Science operates by methodological naturalism -- the assumption, for the purposes of investigation, that natural phenomena have natural causes. This is a methodological tool, not a metaphysical claim. The scientist who says \"I will look for natural explanations\" is doing science. The scientist who says \"only natural explanations exist\" has made a philosophical leap beyond what science itself can justify. A miracle, by definition, is an event that exceeds the ordinary operations of nature. If science could explain it, it would not be a miracle. The question is not whether science can explain miracles but whether miracles are possible -- and that is a philosophical question, not a scientific one. If God exists and created the natural order, then God is not bound by the natural order. The laws of physics describe what happens when no external agent intervenes. They do not prove that no external agent can intervene. David Hume's famous argument against miracles -- that the evidence for a law of nature will always outweigh the evidence for a violation of that law -- is circular: it assumes that miracles do not happen in order to prove that miracles cannot happen. The honest position is that miracles cannot be proved or disproved by science. They can be investigated historically (did the event occur?) and theologically (is it consistent with the character of God?). The resurrection of Jesus, the central miracle of Christianity, is a historical claim. The evidence for and against it deserves the kind of rigorous examination that neither fundamentalists nor militant atheists are usually willing to give it.",
  },
  {
    question: "Did the Big Bang disprove God?",
    answer:
      "The Big Bang theory was proposed by a Catholic priest. That fact alone should give pause to anyone who assumes that modern cosmology has disproved God. Georges Lemaitre, a Belgian priest and physicist, proposed in 1927 what he called the \"primeval atom\" hypothesis -- the idea that the universe began from a single, infinitely dense point and has been expanding ever since. The idea was initially resisted by some secular scientists, including Fred Hoyle (who coined the term \"Big Bang\" as a mockery) and Albert Einstein, partly because it sounded too much like creation. The discovery of cosmic microwave background radiation by Arno Penzias and Robert Wilson in 1964 confirmed Lemaitre's hypothesis and established the Big Bang as the standard model of cosmology. Far from disproving God, the Big Bang raised precisely the question that theists had been asking all along: Why does the universe exist at all? If the universe had a beginning, what caused it? The classical cosmological argument -- everything that begins to exist has a cause -- finds new force in a cosmology that posits a definitive beginning. The physicist Stephen Hawking attempted to resolve this by proposing a no-boundary model that eliminates the need for a temporal beginning, but even Hawking acknowledged that this does not explain why there is something rather than nothing. The Big Bang does not prove God's existence. But the claim that it disproves God is not only wrong -- it is the opposite of what the evidence suggests. A universe with a beginning is more consistent with theism than with the eternal, uncreated universe that atheism traditionally preferred.",
  },
  {
    question: "How old is the earth according to science and according to the Bible?",
    answer:
      "According to the scientific consensus, the earth is approximately 4.5 billion years old, based on radiometric dating of meteorites and the oldest rocks on earth. The universe itself is approximately 13.8 billion years old, based on measurements of the cosmic microwave background radiation and the expansion rate of the universe. These numbers are not speculative. They are derived from multiple independent lines of evidence -- radiometric dating, stellar evolution, geological stratigraphy, and cosmological observation -- that converge on the same timeframe. According to a literal reading of the genealogies in Genesis 5 and 11, combined with the six days of creation interpreted as 24-hour periods, Archbishop James Ussher calculated in 1650 that the earth was created in 4004 BC, giving an age of roughly 6,000 years. Young earth creationism continues to hold this position. But the literal reading of Genesis 1 as a scientific account of creation is not the only way Christians have read the text, and it is not the oldest way. Augustine, writing in the fifth century, argued that the \"days\" of Genesis were not literal 24-hour periods but a literary framework for describing God's creative activity. The Venerable Bede, in the eighth century, accepted an allegorical reading. The Christian tradition has never been uniformly committed to a young earth. The question is not whether you believe the Bible or believe science. The question is what kind of text Genesis is and how it should be read. If Genesis 1 is scientific journalism, the conflict with modern cosmology is irreconcilable. If it is theological poetry -- a doxology about the Creator -- then the conflict dissolves, and science and Scripture are answering different questions about the same universe.",
  },
  {
    question: "How do you reconcile science and faith?",
    answer:
      "The word \"reconcile\" implies a conflict, and the first step is to question whether the conflict is real or constructed. Science and theology are not competing answers to the same question. They are different disciplines asking different questions about the same reality. Science asks how the natural world works -- what are the mechanisms, the processes, the patterns? Theology asks why anything exists at all -- what is the meaning, the purpose, the moral significance? These questions are complementary, not contradictory. The paleontologist Stephen Jay Gould called this the principle of \"non-overlapping magisteria\" (NOMA) -- the idea that science and religion occupy separate domains. The philosopher Alvin Plantinga has argued, more strongly, that there is no actual conflict between science and Christian theism, only an apparent conflict between science and certain interpretations of the Bible. The reconciliation, for most Christians who take both science and Scripture seriously, involves two moves. First, reading the Bible according to its literary genre -- recognizing that Genesis 1 is not a science textbook, that the Bible's purpose is theological rather than encyclopedic, and that ancient Near Eastern cosmology is the cultural container for a theological message that transcends the container. Second, practicing science without metaphysical overreach -- recognizing that science describes the mechanism but does not determine the meaning, and that the success of methodological naturalism does not prove philosophical naturalism. The Christian who reconciles science and faith is not compromising either one. They are refusing to accept a false dilemma imposed by people who need science and faith to be enemies -- a need driven by ideology, not by evidence.",
  },
  {
    question: "Which famous scientists believed in God?",
    answer:
      "The list is long enough to be embarrassing for anyone who claims that scientific knowledge leads inevitably to atheism. In the founding era of modern science: Nicolaus Copernicus (Catholic canon, astronomer), Johannes Kepler (Lutheran, astronomer), Galileo Galilei (Catholic, physicist and astronomer), Blaise Pascal (Catholic, mathematician and physicist), Robert Boyle (Anglican, chemist), Isaac Newton (Anglican/Arian, physicist and mathematician), Gottfried Leibniz (Lutheran, mathematician and philosopher), Michael Faraday (Sandemanian, physicist), James Clerk Maxwell (Presbyterian, physicist), Gregor Mendel (Augustinian friar, geneticist), Lord Kelvin (Presbyterian, physicist), and Georges Lemaitre (Catholic priest, cosmologist who proposed the Big Bang). In the modern era: Max Planck (Lutheran, quantum physicist) wrote that religion and science \"are not contradictory but require supplementation.\" Werner Heisenberg (Lutheran, quantum physicist) argued that \"the first gulp from the glass of natural sciences will turn you into an atheist, but at the bottom of the glass God is waiting for you.\" Arthur Eddington (Quaker, astrophysicist) was a committed believer. Francis Collins (evangelical Christian, geneticist and former NIH director) wrote \"The Language of God\" about his conversion from atheism to Christianity through science. John Polkinghorne (Anglican priest, particle physicist) spent his second career writing about the compatibility of science and faith. These are not marginal figures. They are some of the most consequential scientists in history. Their faith was not a compartmentalized hobby. It was integrated with their scientific work. The claim that science and faith are incompatible must reckon with the fact that many of the people who built modern science would have disagreed.",
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

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Can Science and Faith Coexist? 8 Questions Answered",
  description: "Can science and religion coexist? Evolution, the Big Bang, miracles, the age of the earth, and famous believing scientists. Honest answers that refuse the false dilemma.",
  url: "https://www.livewellbyjamesbell.co/faq/can-science-and-faith-coexist",
  author: { "@type": "Person", name: "James Bell", url: "https://www.livewellbyjamesbell.co/about" },
  publisher: { "@type": "Organization", name: "LiveWell by James Bell" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.livewellbyjamesbell.co/" },
    { "@type": "ListItem", position: 2, name: "Questions People Ask", item: "https://www.livewellbyjamesbell.co/faq" },
    { "@type": "ListItem", position: 3, name: "Can science and faith coexist?", item: "https://www.livewellbyjamesbell.co/faq/can-science-and-faith-coexist" },
  ],
};

export default function CanScienceAndFaithCoexist() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      <SEOMeta
        title="Can Science and Faith Coexist? 8 Questions Answered"
        description="Can science and religion coexist? Evolution, the Big Bang, miracles, the age of the earth, and famous believing scientists. Honest answers that refuse the false dilemma."
        keywords="can science and faith coexist, science vs religion, can Christians believe in evolution, Big Bang God, miracles science, age of earth Bible, scientists who believe in God"
        structuredData={[faqSchema, webPageSchema, breadcrumbSchema]}
      />

      <section style={{ background: "var(--charcoal)", padding: "clamp(80px,12vw,160px) 24px 64px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>PEOPLE ALSO ASK</p>
        <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px,5vw,60px)", fontWeight: 400, color: "var(--charcoal-fg)", maxWidth: "780px", margin: "0 auto", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          Can science and faith coexist?
        </h1>
        <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "rgba(255,255,255,0.6)", marginTop: "32px", maxWidth: "560px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
          The supposed war between science and religion was invented in the nineteenth century. The actual history is more interesting than the myth.
        </p>
      </section>

      <section style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard-text)", marginBottom: "24px" }}>8 QUESTIONS ANSWERED</p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                <button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i} style={{ width: "100%", textAlign: "left", padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", background: "none", border: "none", cursor: "pointer" }}>
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
            The full article traces the history of science and Christianity, dismantles the warfare myth, and examines what the real relationship looks like.
          </p>
          <Link href="/answers" style={{ textDecoration: "none" }}>
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
              { label: "Does God exist?", href: "/faq/does-god-exist" },
              { label: "Is the Bible historically accurate?", href: "/faq/is-the-bible-historically-accurate" },
              { label: "What is deconstruction?", href: "/faq/what-is-deconstruction" },
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
