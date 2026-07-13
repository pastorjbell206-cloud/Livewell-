import { Link } from "wouter";
import { useState } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const FAQ_ITEMS = [
  {
    question: "What is religious trauma?",
    answer:
      "Religious trauma is the psychological harm caused by toxic religious experiences, authoritarian religious systems, or the process of leaving a high-control religious environment. The term was formalized by psychologist Marlene Winell, who coined \"Religious Trauma Syndrome\" to describe the cluster of symptoms experienced by people recovering from fundamentalist, authoritarian, or abusive religious environments. Religious trauma is not the result of believing in God. It is the result of what humans do with religious power. It occurs when religious authority is used to control, manipulate, shame, or silence -- when the structures that should protect are weaponized against the people they serve. Common sources include spiritual abuse by leaders (pastors who demand unquestioning obedience, shame sexual assault survivors, or claim divine authority for personal decisions), purity culture (the teaching that sexual sin makes you permanently damaged, that your worth is tied to your virginity, that your body is a source of temptation and shame), hell-based fear conditioning (using the threat of eternal punishment to enforce compliance), thought-control environments (teachings that doubt is sinful, that questioning leadership is rebellion against God, that emotions are untrustworthy), and shunning practices (the loss of entire social networks when someone leaves or questions the group). Religious trauma is not a theological category. It is a psychological one. And the church's refusal to acknowledge it does not make it less real. It makes it worse.",
  },
  {
    question: "What are the symptoms of religious trauma?",
    answer:
      "The symptoms of religious trauma overlap significantly with other forms of complex trauma and can include anxiety (particularly around spiritual topics, church environments, or religious language), depression, chronic guilt and shame that persists long after leaving the religious environment, difficulty trusting authority figures, hypervigilance in religious settings, flashbacks or intrusive thoughts related to religious teachings (particularly about hell, judgment, or sexual purity), a damaged sense of self (the feeling that you are fundamentally broken, sinful, or worthless), difficulty making decisions independently (after years of deferring to religious authority for every choice), grief over lost community and relationships, anger at the system and the people who enabled it, and confusion about identity and beliefs. Many survivors describe a pervasive sense of cognitive dissonance -- the ongoing tension between what they were taught and what they experienced, between the claims of love and the reality of control. Physical symptoms are also common: insomnia, panic attacks, digestive issues, and other stress-related conditions. The severity depends on the duration and intensity of the toxic religious experience, the age at which it occurred, the degree of social isolation it produced, and the individual's personal resilience. Religious trauma is real trauma. It registers in the body, not just the mind. And it requires real treatment, not just different theology.",
  },
  {
    question: "What causes religious trauma?",
    answer:
      "Religious trauma is caused by the misuse of religious authority and the structural features of high-control religious environments. The most common causes include authoritarian leadership -- systems where the pastor or religious leader claims divine authority for personal decisions, demands unquestioning obedience, and treats disagreement as rebellion against God. Purity culture -- the framework that reduces human sexuality to a binary of purity and defilement, ties personal worth to sexual behavior, and produces devastating shame in people who fail to meet impossible standards. Fear-based theology -- the systematic use of hell, divine punishment, and apocalyptic terror to enforce compliance, particularly when directed at children. Spiritual abuse -- the manipulation of people through their faith, including the misuse of confession, the weaponization of forgiveness (telling abuse survivors they must forgive their abusers in order to be right with God), and the silencing of victims to protect institutional reputation. Social isolation and shunning -- the practice of cutting off relationships with people who leave, question, or are expelled from the community, which produces a form of grief without death. Information control -- the restriction of outside perspectives, the demonization of secular education, and the treatment of intellectual curiosity as spiritual danger. These are not fringe experiences. They are structural features of certain religious systems, and they produce predictable, measurable harm. The church did not intend to create trauma. But intention does not determine impact.",
  },
  {
    question: "Is religious trauma a real psychological condition?",
    answer:
      "Religious Trauma Syndrome is not currently a standalone diagnosis in the DSM-5 (the Diagnostic and Statistical Manual of Mental Disorders), which is the standard classification system used by mental health professionals. However, this does not mean it is not real. Many forms of recognized suffering -- burnout, moral injury, complex grief -- existed long before they received formal diagnostic categories. The symptoms of religious trauma are well-documented in clinical literature and are typically diagnosed under existing categories: post-traumatic stress disorder (PTSD), complex PTSD (C-PTSD), anxiety disorders, depression, and adjustment disorders. Research by psychologists including Marlene Winell, Laura Anderson, and Darrel Ray has documented the specific characteristics that distinguish religious trauma from other forms of psychological harm. The American Psychological Association has published materials acknowledging the psychological impact of authoritarian religious environments. Therapists who specialize in religious trauma report consistent patterns across clients from different religious backgrounds -- evangelical, Catholic, fundamentalist Protestant, Jehovah's Witness, Mormon, ultra-Orthodox Jewish, and others. The consistency of the pattern across traditions suggests that the trauma is produced by structural features of high-control religion rather than by any specific theology. The question of whether religious trauma is \"real\" is usually asked by people who have never experienced it. For those who have, the question answers itself. The clinical evidence supports what survivors already know: this is real, it is measurable, and it requires specialized treatment.",
  },
  {
    question: "How do you heal from religious trauma?",
    answer:
      "Healing from religious trauma is possible, but it is not quick, and it is not simple. The first step is safety -- physical, emotional, and spiritual distance from the environment that caused the harm. You cannot heal in the same system that wounded you, and the people who tell you to stay and work it out from inside are usually the ones who benefit from your compliance. The second step is professional help. Religious trauma is trauma, and it responds to trauma-informed therapy. Cognitive behavioral therapy (CBT), EMDR (Eye Movement Desensitization and Reprocessing), Internal Family Systems (IFS), and somatic experiencing have all shown effectiveness with religious trauma survivors. The therapist should be trained in or at least familiar with religious trauma specifically -- a well-meaning therapist who does not understand the dynamics of authoritarian religion can inadvertently retraumatize clients by dismissing their experience or by pressuring them to reconcile with the institution. The third step is community. Religious trauma isolates. The shunning practices of many high-control groups mean that leaving costs you every relationship you have. Finding new community -- whether in support groups for religious trauma survivors, in healthier faith communities, or in secular spaces where you are valued as you are -- is essential. The fourth step is grief. You are mourning a worldview, a community, a version of God, and often a version of yourself. That grief is legitimate, and it deserves space. Healing is not returning to what you had before. It is becoming something new. It takes time. It is worth it.",
  },
  {
    question: "Can you still have faith after religious trauma?",
    answer:
      "Yes. But the faith that survives religious trauma rarely looks like the faith that preceded it, and that is not a loss. It is a sign that the faith has been tested by fire and what remains is more honest than what burned away. Many survivors of religious trauma do leave faith entirely, and that decision deserves respect. The institution that wounded them does not get to dictate the terms of their recovery. If walking away from God is what someone needs to do in order to heal, that is between them and God -- not between them and the church that hurt them. But many others find their way to a faith that is deeper, more resilient, and more honest than what they left. They often move from fundamentalist or evangelical traditions to mainline, liturgical, or contemplative ones. They find the Catholic intellectual tradition, the Orthodox emphasis on mystery, the Quaker practice of silence, or the Anglican via media -- traditions that hold faith and doubt together rather than treating doubt as a disease. The reconstructed faith tends to be less certain and more trusting. Less about right answers and more about right relationship. Less afraid of questions and more suspicious of systems that forbid them. It is a faith that has been through the wilderness and come out the other side -- not unscathed, but standing. The church owes these survivors more than it has given them. It owes them honesty about what happened, accountability for who caused it, and the freedom to rebuild on their own terms.",
  },
  {
    question: "What kind of therapy is recommended for religious trauma?",
    answer:
      "The most effective therapeutic approaches for religious trauma are trauma-informed modalities adapted to the specific dynamics of religious abuse. Cognitive Behavioral Therapy (CBT) helps survivors identify and challenge the distorted thought patterns implanted by toxic religious teaching -- beliefs like \"I am fundamentally worthless,\" \"doubt is sin,\" \"my body is shameful,\" and \"questioning authority means rebelling against God.\" These cognitive distortions often function as deeply held theological convictions, which makes them harder to dislodge than typical cognitive distortions. EMDR (Eye Movement Desensitization and Reprocessing) has shown strong results for survivors whose trauma is stored in the body -- the physical anxiety response triggered by church buildings, worship music, certain Scripture passages, or authority figures. Internal Family Systems (IFS) therapy helps survivors understand the internal \"parts\" that developed in response to religious control -- the inner critic that sounds like the pastor's voice, the people-pleaser that learned to survive by compliance, the rebellious part that rejects everything. Somatic experiencing addresses the physical symptoms of religious trauma -- the clenched jaw, the shallow breathing, the chronic tension stored in the body. The most important factor is the therapist's competence with religious dynamics. Organizations like the Religious Trauma Institute and the Reclamation Collective maintain directories of therapists trained in this area. Group therapy and peer support groups -- including organizations like Journey Free and Recovering from Religion -- provide community and validation. The key is finding a therapist who takes your experience seriously, who does not rush you toward forgiveness or reconciliation, and who understands that healing is not the same thing as returning to church.",
  },
  {
    question: "How can churches prevent religious trauma?",
    answer:
      "The prevention of religious trauma requires structural change, not just better intentions. Good people in bad systems produce bad outcomes. The systems have to change. First, accountability. Every church needs an independent governance structure with the power to investigate complaints, discipline leaders, and remove pastors. Churches where the pastor controls the board, appoints the elders, and manages the finances are structurally set up for abuse, regardless of the pastor's character. Second, transparency. Published budgets. Public salaries. Open meetings. The instinct to protect the institution by controlling information is the same instinct that enables abuse. Third, theological honesty. Stop teaching children that doubt is sinful. Stop using hell as a behavioral management tool. Stop equating questions with rebellion. A theology that cannot withstand scrutiny is not worth defending, and the attempt to defend it by suppressing scrutiny is itself a form of spiritual abuse. Fourth, sexual ethic reform. Purity culture -- the teaching that a person's worth is tied to their sexual history -- has produced a generation of trauma. The church needs a sexual ethic that is honest about desire, realistic about failure, and rooted in the dignity of the body rather than in shame. Fifth, safe reporting mechanisms. Every church should have a clear, publicized process for reporting abuse that goes to an independent body, not to the pastor or the church board. Sixth, training. Every pastor should receive training in recognizing abuse, understanding trauma, and referring people to professional help. Seminary curricula should include courses on power dynamics, boundary violations, and the psychology of high-control groups. The church that prevents religious trauma is the church that takes its own power seriously enough to limit it. That requires humility. It also requires courage. Both are in short supply.",
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
  name: "What Is Religious Trauma? 8 Questions Answered Honestly",
  description: "What is religious trauma? Symptoms, causes, healing, and how churches can prevent it. Honest answers from a pastor willing to name what the church has done.",
  url: "https://www.livewellbyjamesbell.co/faq/what-is-religious-trauma",
  author: { "@type": "Person", name: "James Bell", url: "https://www.livewellbyjamesbell.co/about" },
  publisher: { "@type": "Organization", name: "LiveWell by James Bell" },
};

export default function WhatIsReligiousTrauma() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      <SEOMeta
        title="What Is Religious Trauma? 8 Questions Answered Honestly"
        description="What is religious trauma? Symptoms, causes, healing, and how churches can prevent it. Honest answers from a pastor willing to name what the church has done."
        keywords="religious trauma, religious trauma syndrome, spiritual abuse, healing from religious trauma, church abuse, purity culture trauma, leaving church trauma"
        structuredData={[faqSchema, webPageSchema]}
      />

      <section style={{ background: "var(--charcoal)", padding: "clamp(80px,12vw,160px) 24px 64px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>PEOPLE ALSO ASK</p>
        <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px,5vw,60px)", fontWeight: 400, color: "white", maxWidth: "780px", margin: "0 auto", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          What is religious trauma?
        </h1>
        <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "rgba(255,255,255,0.6)", marginTop: "32px", maxWidth: "560px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
          The church caused this. A pastor names it, examines it, and refuses to look away.
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
            The full article examines what the church did, why it happened, and what repair looks like -- without minimizing the damage or letting the institution off the hook.
          </p>
          <Link href="/writing/religious-trauma-is-real" style={{ textDecoration: "none" }}>
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
              { label: "What is deconstruction?", href: "/faq/what-is-deconstruction" },
              { label: "Why are people leaving the church?", href: "/faq/why-are-people-leaving-church" },
              { label: "Why do young people leave church?", href: "/faq/why-do-young-people-leave-church" },
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
