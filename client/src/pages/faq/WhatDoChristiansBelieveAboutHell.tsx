import { Link } from "wouter";
import { useState } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const FAQ_ITEMS = [
  {
    question: "Is hell real?",
    answer:
      "The question depends on what you mean by real and what you mean by hell. Jesus spoke about judgment and its consequences more than any other figure in the New Testament. He used the word Gehenna -- a reference to the Valley of Hinnom outside Jerusalem, a place associated with child sacrifice and later used as a burning garbage dump -- as his primary image for divine judgment. He described a place of \"outer darkness\" and \"weeping and gnashing of teeth.\" He told a parable about a rich man and a beggar named Lazarus that depicts conscious suffering after death. The overwhelming consensus of Christian theology across two millennia is that human choices have eternal consequences and that rejecting God's grace has a destination. Whether that destination is a literal place of fire, a state of self-imposed separation from God, or something else entirely is where the disagreement begins. What is clear from the New Testament is that Jesus took the stakes of human life with absolute seriousness. He did not present the universe as a consequence-free zone. He presented it as a place where what you do with the truth matters permanently. The person who dismisses hell entirely has to explain why Jesus spent so much time warning about it. The person who relishes it has missed the point of every warning: they were given in tears, not triumph.",
  },
  {
    question: "What is the difference between eternal torment, annihilationism, and universalism?",
    answer:
      "These are the three major views Christians have held about the ultimate fate of the unrepentant, and each has serious theological advocates. Eternal conscious torment is the traditional majority view, held by Augustine, Aquinas, Calvin, and most of the Western church. It teaches that those who reject God's grace will experience conscious suffering for eternity. Its defenders argue that sin against an infinite God warrants infinite punishment, and that human freedom includes the freedom to choose permanent separation from God. Annihilationism, also called conditional immortality, teaches that the unsaved will ultimately cease to exist rather than suffer forever. Its defenders -- including John Stott, Edward Fudge, and Clark Pinnock -- point to biblical language about \"destruction,\" \"death,\" and \"perishing,\" and argue that eternal life is a gift of grace, not a default human possession. Universalism teaches that God's love will ultimately redeem all people, that hell is real but temporary -- a purifying fire rather than a permanent prison. Its advocates include Gregory of Nyssa, one of the Cappadocian fathers, and more recently, David Bentley Hart. Each view has biblical texts in its favor. Each has texts that create difficulty. The honest reader will engage all three rather than pretending the question was settled in the fourth century. What unites them is the conviction that God's judgment is real. What divides them is the question of what God's judgment ultimately accomplishes.",
  },
  {
    question: "What does the Bible actually say about hell?",
    answer:
      "The Bible uses several different terms and images, and collapsing them into a single uniform doctrine requires more certainty than the texts themselves provide. The Hebrew Bible has almost nothing to say about hell in the way most Christians imagine it. Sheol, the most common term in the Old Testament, refers to the abode of the dead -- a shadowy existence, not a place of punishment. The development of a clear afterlife doctrine in Judaism is a late phenomenon, emerging in the intertestamental period in texts like 1 Enoch and 2 Maccabees. In the New Testament, Jesus uses Gehenna eleven times, Hades twice, and the metaphors of outer darkness, fire, and the \"worm that does not die.\" Paul never uses the word hell. He speaks of \"destruction\" and \"death\" as the consequences of sin, language more consistent with annihilationism than eternal torment. Revelation describes a \"lake of fire\" into which death, Hades, and those not found in the book of life are thrown. The book of Revelation is apocalyptic literature -- a genre built on symbolic imagery -- and whether the lake of fire is literal, metaphorical, or something our categories cannot contain is debated. What the Bible consistently teaches is that God's judgment is real, that human choices have consequences beyond this life, and that the purpose of warning is rescue, not terror. The texts resist being turned into a systematic doctrine of hell. They are more interested in what God has done to save than in the mechanics of what happens to those who refuse.",
  },
  {
    question: "Who goes to hell?",
    answer:
      "The honest answer is that the Bible provides principles without providing a census. Jesus said \"I am the way, the truth, and the life; no one comes to the Father except through me\" (John 14:6), which the church has traditionally interpreted as meaning that salvation comes through Christ alone. But the question of whether that requires explicit knowledge of and conscious faith in Jesus has been debated since the early church. The inclusivist position, associated with Karl Rahner's concept of the \"anonymous Christian\" and with C.S. Lewis's depiction of the Calormene soldier in \"The Last Battle,\" holds that Christ's atoning work can save people who never heard his name -- that God judges people according to the light they received, not the light they were denied. The exclusivist position holds that conscious faith in Christ is necessary for salvation. The universalist position, as noted above, holds that God's grace will ultimately reach everyone. What the Bible is clear about is that judgment is based on what you did with what you knew, not on what you never had the chance to know. The parable of the sheep and the goats in Matthew 25 suggests that judgment is based on how you treated the vulnerable -- the hungry, the imprisoned, the stranger -- and that some people who claim to know Christ will be rejected, while some who never named him will be received. That parable should terrify the comfortable more than the questioner.",
  },
  {
    question: "Is hell literally fire?",
    answer:
      "The fire imagery is the most prominent biblical metaphor for hell, but it is in tension with other images in the same texts. Jesus describes hell as both \"fire\" and \"outer darkness.\" Fire and darkness are opposites. If one is literal, the other cannot be. This suggests that the imagery is pointing toward a reality that human language can only approximate, not providing a literal description of the physical environment. The early church fathers were divided. Origen and Gregory of Nyssa interpreted the fire as purifying rather than punitive. Augustine argued for literal fire. Aquinas argued that the fire was real but not ordinary physical fire. Calvin emphasized the anguish of separation from God rather than physical torment. C.S. Lewis, in \"The Great Divorce,\" depicted hell not as a torture chamber but as a grey, empty city where people gradually become smaller and more isolated, endlessly receding from reality. The metaphor that best captures the New Testament's concerns is not a furnace but a locked door -- locked from the inside, as Lewis put it. Hell is the final honoring of human freedom: the person who spent a lifetime saying \"my will be done\" is at last granted their request. The fire, whether literal or metaphorical, represents the agony of a creature made for God who has irrevocably chosen to live without him. Whether that is more or less terrible than literal flames is a question the image is designed to prevent you from answering glibly.",
  },
  {
    question: "What about people who have never heard the gospel?",
    answer:
      "This question has haunted Christian theology since the second century, and any answer that does not begin with humility is not worth trusting. The New Testament was written to communities that had heard the gospel; it does not directly address the fate of those who have not. But several principles emerge. Paul argues in Romans 1-2 that God has revealed himself through creation and conscience -- that all people have access to some knowledge of God, even without special revelation. He also says that God will judge people according to the law they had, not the law they lacked: \"When Gentiles, who do not have the law, do by nature things required by the law, they are a law for themselves\" (Romans 2:14). The Second Vatican Council declared that those who \"through no fault of their own do not know the Gospel of Christ\" but \"seek God with a sincere heart\" may attain eternal salvation. Many Protestant theologians, including John Wesley, have held similar views. The underlying conviction is that God is just, and that justice does not condemn people for failing to respond to a message they never received. The missionary impulse of Christianity is not motivated by the fear that everyone who has not heard is damned. It is motivated by the conviction that the gospel is good news that everyone deserves to hear. The two impulses are different, and confusing them has produced enormous damage -- both to the unevangelized and to the credibility of the church.",
  },
  {
    question: "Has the church always believed the same thing about hell?",
    answer:
      "No. The history of the doctrine of hell is far more diverse than most people realize, and the claim that the church has always taught eternal conscious torment in a single, unified way is historically inaccurate. In the first five centuries of the church, three distinct views existed side by side. The majority view, particularly in the Latin West influenced by Tertullian and Augustine, was eternal conscious torment. But universalism had significant advocates: Clement of Alexandria, Origen, and Gregory of Nyssa all taught some form of universal restoration. Gregory of Nyssa was never condemned for his universalism, despite being recognized as a saint and a pillar of Trinitarian orthodoxy. Conditional immortality appeared in the writings of Arnobius and, some scholars argue, Irenaeus. The Fifth Ecumenical Council in 553 condemned certain propositions associated with Origen, but whether it condemned universalism per se is debated by historians. In the medieval period, the Western church consolidated around Augustine's view, reinforced by Aquinas and by the vivid imagery of Dante's Inferno, which shaped the popular imagination more than any biblical text. The Reformation largely inherited the Augustinian consensus. The modern period has seen a significant reopening of the debate, with respected evangelical scholars like John Stott defending annihilationism and Orthodox theologians like David Bentley Hart defending universalism. The doctrine of hell is not a settled question with a single historical answer. It is a question the church has wrestled with from the beginning and continues to wrestle with honestly.",
  },
  {
    question: "Does a loving God send people to hell?",
    answer:
      "The question contains an assumption that needs to be examined before it can be answered: that hell is something God does to people rather than something people choose for themselves. The classical Christian understanding, articulated most clearly by C.S. Lewis, is that hell is not God's punishment inflicted from outside but the natural consequence of a life lived in opposition to the source of all good, all beauty, and all love. If God is the source of everything good, then separation from God is separation from everything good. That separation is not arbitrary. It is the logical terminus of a lifetime of choices. Lewis argued that \"the doors of hell are locked from the inside\" -- that no one is in hell who would rather be somewhere else, because the capacity to prefer God has been systematically destroyed by the choices that led there. This does not make hell less terrible. It makes it more terrible, because it means hell is the final shape of human freedom when freedom has been used to reject everything it was made for. The deeper question behind the question is whether love requires the elimination of consequences. A parent who loves a child does not prevent the child from experiencing the results of their choices -- because preventing consequences is not love. It is control. God's love is not coercive. It invites. It warns. It weeps. But it does not override the will. The person who asks whether a loving God sends people to hell is asking the right question. The answer is that a loving God does something worse: he honors the choice.",
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
  name: "What Do Christians Believe About Hell? 8 Questions Answered",
  description: "What does the Bible say about hell? Eternal torment vs. annihilation vs. universalism, who goes there, and whether a loving God sends people to hell. Honest answers.",
  url: "https://www.livewellbyjamesbell.co/faq/what-do-christians-believe-about-hell",
  author: { "@type": "Person", name: "James Bell", url: "https://www.livewellbyjamesbell.co/about" },
  publisher: { "@type": "Organization", name: "LiveWell by James Bell" },
};

export default function WhatDoChristiansBelieveAboutHell() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      <SEOMeta
        title="What Do Christians Believe About Hell? 8 Questions Answered"
        description="What does the Bible say about hell? Eternal torment vs. annihilation vs. universalism, who goes there, and whether a loving God sends people to hell."
        keywords="what do Christians believe about hell, is hell real, eternal torment, annihilationism, universalism, does a loving God send people to hell, Bible hell"
        structuredData={[faqSchema, webPageSchema]}
      />

      <section style={{ background: "var(--charcoal)", padding: "clamp(80px,12vw,160px) 24px 64px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>PEOPLE ALSO ASK</p>
        <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px,5vw,60px)", fontWeight: 400, color: "white", maxWidth: "780px", margin: "0 auto", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          What do Christians believe about hell?
        </h1>
        <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "rgba(255,255,255,0.6)", marginTop: "32px", maxWidth: "560px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
          The doctrine is more debated, more diverse, and more important than the bumper-sticker versions on either side suggest.
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
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "white", marginBottom: "16px" }}>Read the full essay</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "48ch", marginLeft: "auto", marginRight: "auto" }}>
            The full article traces the doctrine through Scripture, church history, and contemporary theology with the care this question demands.
          </p>
          <Link href="/writing/does-hell-exist" style={{ textDecoration: "none" }}>
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
              { label: "Catholic vs. Protestant -- what is the difference?", href: "/faq/catholic-vs-protestant" },
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
