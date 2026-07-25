import { Link } from "wouter";
import { useState } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const FAQ_ITEMS = [
  {
    question: "What are the best arguments for God's existence?",
    answer:
      "The strongest arguments for God's existence are not proofs in the mathematical sense. They are cumulative cases -- lines of evidence that converge on a conclusion even if no single line is decisive. The cosmological argument, refined by Leibniz and restated by William Lane Craig, observes that everything that begins to exist has a cause, the universe began to exist, and therefore the universe has a cause. The cause must be outside space and time, immaterial, and enormously powerful -- which begins to look like what theists mean by God. The fine-tuning argument notes that the physical constants of the universe are calibrated within extraordinarily narrow ranges for the possibility of life. The gravitational constant, the strong nuclear force, the cosmological constant -- alter any of them by a fraction of a percent and no stars form, no chemistry occurs, no life is possible. The moral argument, articulated by C.S. Lewis and refined by philosophers like Robert Adams, observes that moral obligations feel objectively binding in a way that is difficult to explain if the universe is ultimately impersonal. The argument from consciousness -- why does subjective experience exist at all? -- remains one of the hardest problems in philosophy, and materialist explanations have not resolved it. None of these arguments compels belief. But taken together, they suggest that theism is not the intellectually naive position its critics assume. The question is whether the evidence points somewhere, even if it does not arrive.",
  },
  {
    question: "What are the best arguments against God's existence?",
    answer:
      "The strongest objection to theism is the problem of suffering, and it has been the strongest objection for three thousand years. The argument, formalized by Epicurus and restated by David Hume, is simple: if God is all-powerful, he could prevent suffering. If God is all-good, he would want to prevent it. Suffering exists. Therefore either God is not all-powerful, not all-good, or does not exist. The evidential version, developed by William Rowe, argues that even if some suffering serves a purpose, the sheer volume and distribution of suffering -- childhood cancer, natural disasters, animal predation over millions of years -- exceeds anything a good God would permit. The argument from divine hiddenness, articulated by J.L. Schellenberg, asks why a loving God would allow sincere seekers to live without evidence of his existence. The argument from religious diversity observes that billions of people across history have had mutually exclusive religious experiences with equal sincerity -- suggesting that religious experience is culturally conditioned rather than revelatory. The naturalist argument holds that every phenomenon previously attributed to God -- lightning, disease, the origin of species -- has eventually received a natural explanation, and the remaining gaps are shrinking. These are serious objections, and the Christian who dismisses them has not understood them. The honest response is not to pretend they have easy answers but to weigh them against the cumulative case for theism and decide which set of difficulties you are willing to live with.",
  },
  {
    question: "Can you prove that God exists?",
    answer:
      "Not in the way you prove a theorem in mathematics or a hypothesis in a laboratory. But that standard of proof applies to almost nothing that matters. You cannot prove that your spouse loves you. You cannot prove that consciousness exists in anyone other than yourself. You cannot prove that the universe was not created five minutes ago with the appearance of age. You cannot prove that reason itself is reliable -- any argument for the reliability of reason must use reason, which is circular. The demand for scientific proof of God misunderstands both science and God. Science investigates the natural world through observation, hypothesis, and experiment. God, by definition, is not a natural object within the universe but the ground of the universe's existence. Asking science to prove God is like asking a metal detector to find music. The tool is excellent; it is simply not designed for that kind of search. What we have instead of proof is evidence -- philosophical arguments, historical claims (particularly the resurrection), moral intuitions, aesthetic experiences, the testimony of billions of people across cultures and centuries, and the remarkable fine-tuning of a universe that did not have to exist at all. This evidence is not coercive. It leaves room for reasonable disagreement. But the absence of proof is not the absence of evidence, and the person who says \"there is no evidence for God\" has usually not looked at the evidence that exists. The honest position is not certainty in either direction. It is a willingness to follow the evidence wherever it leads, even if it leads somewhere uncomfortable.",
  },
  {
    question: "If God exists, why is there so much suffering?",
    answer:
      "This is the hardest question in theology, and any answer that does not begin with that admission is not worth hearing. The classical free-will defense, associated with Alvin Plantinga, argues that a world with free creatures capable of genuine love necessarily includes the possibility of genuine evil. God could have created a world of puppets, but that world would not contain love, and a world without love is worse than a world with suffering. The soul-making theodicy, developed by John Hick drawing on Irenaeus, argues that suffering is the necessary environment for the development of virtues like courage, compassion, and perseverance -- that a pain-free world would produce shallow souls. Both of these have force, and both have limits. The free-will defense does not explain natural evil -- earthquakes, childhood leukemia, the suffering of animals over millions of years of evolution. The soul-making theodicy does not explain suffering that destroys rather than refines. The Bible's most sustained engagement with the question is the book of Job, and Job's answer is not an explanation. It is an encounter. God does not explain Job's suffering. God shows up. The Christian claim is not that suffering has a satisfying philosophical explanation. The Christian claim is that God entered suffering in the person of Jesus -- that the cross is God's response to the problem of evil, not by explaining it but by submitting to it. That is not a complete answer. It is the beginning of one. And it is more honest than pretending the question has been solved.",
  },
  {
    question: "Can scientists believe in God?",
    answer:
      "They can, and many do. The narrative that science and faith are inherently opposed is historically illiterate. The founders of modern science were overwhelmingly theists: Copernicus was a canon in the Catholic Church. Galileo remained a Catholic until his death. Newton wrote more about theology than physics. Faraday was a devout Sandemanian. Maxwell was a committed Presbyterian. Mendel was an Augustinian friar. Lemaitre, who proposed the Big Bang theory, was a Catholic priest. The idea that science and religion are at war was popularized in the late nineteenth century by John William Draper and Andrew Dickson White, and historians of science have spent the last fifty years dismantling it. Contemporary scientists who are believers include Francis Collins, former director of the National Institutes of Health and leader of the Human Genome Project, who identifies as an evangelical Christian. John Polkinghorne, a Cambridge particle physicist, became an Anglican priest. Jennifer Wiseman, a senior astrophysicist at NASA, is an active Christian. A 2009 Pew survey found that 51% of scientists believe in God or a higher power. The number is lower than the general population, but it is not negligible, and it demolishes the claim that scientific knowledge makes belief impossible. The scientists who believe in God are not compartmentalizing. They are recognizing that science answers how and theology answers why, and that both questions are legitimate. The conflict is not between science and faith. It is between scientism -- the philosophical claim that science is the only valid form of knowledge -- and everything else.",
  },
  {
    question: "What is the difference between faith and proof?",
    answer:
      "The popular caricature defines faith as belief without evidence -- believing something despite having no reason to. This is not what the Bible means by faith, and it is not what the Christian intellectual tradition has ever meant. The biblical word for faith -- pistis in Greek, emunah in Hebrew -- means trust, fidelity, committed loyalty. It is the confidence that a person is who they claim to be and will do what they promise. It is closer to the trust you place in a surgeon before an operation than to the credulity of believing in fairies. You have evidence -- the surgeon's credentials, reputation, training -- but you still have to trust, because you cannot perform the surgery yourself. Proof, in the strict sense, is limited to formal logic and mathematics. Outside those domains, we operate on evidence, probability, and trust. You trust that the sun will rise tomorrow not because you can prove it but because the evidence overwhelmingly supports it. You trust that your memories are real, that other minds exist, that the laws of physics will hold. None of these are provable. All of them are reasonable. Christian faith is trust in a person -- the God revealed in Jesus Christ -- based on historical evidence (the resurrection), philosophical arguments (the existence of the universe, moral reality, consciousness), personal experience, and the testimony of a community that stretches across two millennia. It is not certainty. Certainty is the enemy of faith, not its fulfillment. Faith is the willingness to act on the best evidence available, knowing that the evidence is not coercive. That is not credulity. That is courage.",
  },
  {
    question: "What if I'm not sure whether God exists?",
    answer:
      "Then you are in better company than you think. The Bible is populated by people who were not sure. Abraham laughed at God's promise. Moses asked God to send someone else. Gideon demanded signs. Thomas refused to believe without physical evidence -- and Jesus showed up and gave it to him. The Psalms are loaded with the language of uncertainty: \"How long, O Lord? Will you forget me forever?\" The idea that faith requires absolute certainty is a modern evangelical invention, not a biblical one. Doubt is not the opposite of faith. Apathy is. The person who wrestles with God's existence is taking the question more seriously than the person who affirms it every Sunday without thinking about it. The philosopher Paul Tillich argued that doubt is an element within faith itself -- that the faith which has never been tested by doubt is not faith but comfortable habit. If you are not sure, the honest thing to do is to investigate. Read the strongest arguments on both sides -- not the internet summaries, the actual books. Alvin Plantinga and Richard Swinburne for theism. J.L. Mackie and Graham Oppy for atheism. Read the gospels as if you have never read them before. Talk to the most intelligent believer you know and the most intelligent skeptic. Attend a church that takes your questions seriously. And be honest about what you find. The God of the Bible is not threatened by your uncertainty. The only people threatened by it are the ones who have confused their certainty with God's existence.",
  },
  {
    question: "Where should I start if I am exploring whether God exists?",
    answer:
      "Start with the question, not the answer. Do not begin by reading books that will confirm what you already suspect. Begin by reading the strongest case for the position you find least plausible. If you lean toward atheism, read Alvin Plantinga's \"Where the Conflict Really Lies\" or C.S. Lewis's \"Mere Christianity\" -- not because they will convince you, but because they will show you that theism is not the intellectually lazy position you may have assumed. If you lean toward belief, read Bertrand Russell's \"Why I Am Not a Christian\" or Bart Ehrman's \"God's Problem\" -- not to destroy your faith, but to test it. Then read the primary source. The Gospel of Mark is the shortest, the earliest, and the most abrupt. It can be read in an hour. Read it in one sitting, the way you would read a short novel. Do not bring your assumptions. Let the text speak. After that, find a person -- not a book, a person -- who believes differently than you and who is willing to have an honest conversation. Not a debate. A conversation. Ask them what they believe and why, and listen without formulating your response while they are still talking. Finally, pay attention to your own experience. Not your feelings -- feelings are unreliable. But your deepest intuitions about reality. Do you live as though morality is real? As though love is more than chemistry? As though your life has meaning beyond the biological? If so, ask yourself what kind of universe makes those intuitions intelligible. The answer may surprise you. The investigation is worth your time, because the question of God's existence is not academic. It is the question that determines the meaning of every other question you will ever ask.",
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
  name: "Does God Exist? 8 Honest Answers to the Hardest Question",
  description: "Does God exist? The best arguments for and against, the role of suffering, the difference between faith and proof, and where to start if you are not sure.",
  url: "https://www.livewellbyjamesbell.co/faq/does-god-exist",
  author: { "@type": "Person", name: "James Bell", url: "https://www.livewellbyjamesbell.co/about" },
  publisher: { "@type": "Organization", name: "LiveWell by James Bell" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.livewellbyjamesbell.co/" },
    { "@type": "ListItem", position: 2, name: "Questions People Ask", item: "https://www.livewellbyjamesbell.co/faq" },
    { "@type": "ListItem", position: 3, name: "Does God exist?", item: "https://www.livewellbyjamesbell.co/faq/does-god-exist" },
  ],
};

export default function DoesGodExist() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      <SEOMeta
        title="Does God Exist? 8 Honest Answers to the Hardest Question"
        description="Does God exist? The best arguments for and against, the role of suffering, the difference between faith and proof, and where to start if you are not sure."
        keywords="does God exist, proof God exists, arguments for God, arguments against God, problem of suffering, faith vs proof, can scientists believe in God"
        structuredData={[faqSchema, webPageSchema, breadcrumbSchema]}
      />

      <section style={{ background: "var(--charcoal)", padding: "clamp(80px,12vw,160px) 24px 64px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>PEOPLE ALSO ASK</p>
        <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px,5vw,60px)", fontWeight: 400, color: "var(--charcoal-fg)", maxWidth: "780px", margin: "0 auto", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          Does God exist?
        </h1>
        <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "rgba(255,255,255,0.6)", marginTop: "32px", maxWidth: "560px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
          The most important question you can ask, answered by a pastor who spent years asking it himself -- from the other side.
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
            The full article engages the philosophical, scientific, and personal dimensions of the question with the seriousness it deserves.
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
              { label: "Can science and faith coexist?", href: "/faq/can-science-and-faith-coexist" },
              { label: "Is the Bible historically accurate?", href: "/faq/is-the-bible-historically-accurate" },
              { label: "What do Christians believe about hell?", href: "/faq/what-do-christians-believe-about-hell" },
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
