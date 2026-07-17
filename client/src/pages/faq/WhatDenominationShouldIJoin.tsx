import { Link } from "wouter";
import { useState } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const FAQ_ITEMS = [
  {
    question: "How many Christian denominations are there?",
    answer:
      "The number most often cited is 45,000, from the World Christian Encyclopedia. That number is misleading. It counts every independent congregation and national church body as a separate denomination, which inflates the total dramatically. A more useful framework recognizes three major families -- Catholic, Orthodox, and Protestant -- with Protestantism further divided into several large branches: Lutheran, Reformed/Presbyterian, Anglican, Baptist, Methodist, Pentecostal/Charismatic, Anabaptist, and Restorationist. Within each branch are dozens to hundreds of distinct bodies. The Southern Baptist Convention and the American Baptist Churches USA are both Baptist but differ significantly on theology and governance. The Presbyterian Church (USA) and the Presbyterian Church in America share a name and a confessional heritage but have split over sexuality, biblical authority, and ordination. The number of functionally distinct traditions is closer to 20-30, depending on how you draw the lines. The proliferation of denominations is sometimes cited as evidence that Christianity is hopelessly fractured. It is fractured. But the fractures usually follow cultural and political fault lines as much as theological ones. The core claims that unite Nicene Christianity -- one God in three persons, the incarnation, the bodily resurrection, salvation by grace -- are shared across the overwhelming majority of these bodies. Denominations are the way Christians have organized their disagreements. Whether that is a failure or a feature depends on what you think unity requires.",
  },
  {
    question: "What are the main differences between denominations?",
    answer:
      "The differences cluster around five axes. First, authority: Catholics locate authority in Scripture, tradition, and the magisterium (the teaching office of the Pope and bishops). Orthodox Christians locate it in Scripture and the consensus of the ecumenical councils. Protestants locate it primarily in Scripture, though they disagree about what that means in practice. Second, worship: liturgical traditions (Catholic, Orthodox, Anglican, Lutheran) follow a structured order of service rooted in ancient patterns. Free-church traditions (Baptist, Pentecostal, non-denominational) prioritize spontaneity and congregational participation. Third, sacraments: Catholics and Orthodox recognize seven sacraments. Most Protestants recognize two (baptism and communion) and disagree about what happens in them. Do the bread and wine become the body and blood of Christ? Is baptism for infants or only for believers? These questions have divided churches for centuries. Fourth, governance: Episcopal polity (Catholic, Orthodox, Anglican, Methodist) is governed by bishops. Presbyterian polity is governed by elected elders. Congregational polity (Baptist, most non-denominational) gives authority to the local church. Fifth, soteriology: how salvation works. Calvinists emphasize God's sovereign election. Arminians emphasize human free will. Catholics emphasize the sacraments and ongoing sanctification. The differences are real, and they matter. But they are not all equally important, and most of them are less important than the things that hold the tradition together.",
  },
  {
    question: "How do I choose a denomination or church?",
    answer:
      "Start with what you believe, not with what you like. Preference is the wrong criterion for a community that will shape your soul. Ask yourself the non-negotiable questions: Do you believe the Bible is the sole authority, or do you value tradition alongside Scripture? Do you believe in infant baptism or believer's baptism? Do you want liturgical worship or a more informal service? Do you believe in the real presence of Christ in communion? Your answers to these questions will narrow the field significantly. Then look for a church within that tradition that has three characteristics. First, theological seriousness -- a church that teaches the Bible with intellectual rigor and does not avoid hard questions. Ask what the pastor has read recently. If the answer is only church leadership books, keep looking. Second, pastoral integrity -- a church where the leaders are accountable, transparent about finances, and willing to admit when they are wrong. Third, a community that practices what it preaches -- not perfectly, but honestly. Visit the midweek gathering, not just Sunday morning. Talk to people who have been there for years and ask what the church does when things go wrong. Every church will disappoint you. The question is whether it will disappoint you in ways that drive you deeper into the faith or away from it. Choose the community that tells you the truth, even when you would rather hear something else.",
  },
  {
    question: "Does your denomination really matter?",
    answer:
      "Yes and no. It does not matter in the sense that God is not a denominationalist. The thief on the cross was not baptized in any particular tradition. The early church existed for centuries before the formal divisions that produced the denominations we know today. The Nicene Creed -- the closest thing Christianity has to a universal statement of faith -- is shared across Catholic, Orthodox, and most Protestant traditions. If the core claims of Christianity are true, they are true regardless of whether you encounter them in a cathedral, a storefront church, or a living room. But denomination matters in the sense that the community you join will shape your theology, your spiritual practices, your moral imagination, and your understanding of authority. A Baptist will learn to read the Bible differently than a Catholic. A Pentecostal will pray differently than a Presbyterian. A Quaker will experience silence in worship; a charismatic church will experience noise. These differences are formative. They are not neutral. The tradition you inhabit will teach you certain things about God and leave other things untaught. No single tradition has everything. The wisest Christians are usually the ones who know their own tradition deeply and have learned from others generously. Denomination matters the way a family matters -- it is the particular household where you learn to live, and it shapes you more than you realize. Choose carefully. Stay long enough to be formed, not just entertained.",
  },
  {
    question: "What are the pros and cons of non-denominational churches?",
    answer:
      "Non-denominational churches are the fastest-growing segment of American Christianity, and their appeal is understandable. They offer freedom from institutional baggage, contemporary worship styles, and a theology that often presents itself as \"just the Bible\" without denominational add-ons. For people burned by institutional Christianity, a non-denominational church can feel like a fresh start. But the advantages carry corresponding risks. The freedom from institutional accountability means there is often no external body that can discipline a pastor, audit finances, or intervene when things go wrong. Many of the most prominent clergy abuse cases in the last decade have occurred in non-denominational churches with personality-driven leadership and minimal oversight. The claim to be \"just biblical\" is itself a theological position -- usually a low-church evangelical one -- that carries assumptions about interpretation, worship, and authority. Every church has a tradition, even if it does not name it. Non-denominational churches often inherit evangelical Protestant theology by default while claiming to be tradition-free. The lack of historical rootedness can also produce theological shallowness. Churches connected to a denomination -- even imperfectly -- have access to centuries of theological reflection, confessional documents, and accumulated wisdom about how communities go wrong. Non-denominational churches start from scratch every generation. That can produce innovation. It can also produce the same mistakes the church has been making for two thousand years, without the institutional memory to recognize them.",
  },
  {
    question: "Can you switch denominations?",
    answer:
      "Yes. Christians have been changing churches and traditions since the Reformation, and in many cases long before. Switching denominations is not betrayal. It can be a sign of theological growth -- a recognition that the tradition you were raised in no longer represents what you believe, or that another tradition offers resources your current one lacks. Many Catholics have become Protestant. Many Protestants have become Catholic or Orthodox. Many evangelicals have found their way into mainline or liturgical traditions. The movement goes in every direction. Some traditions make switching easier than others. Moving between Protestant denominations is usually straightforward. Moving from Protestantism to Catholicism requires a formal process of instruction and reception (the Rite of Christian Initiation of Adults). Converting to Eastern Orthodoxy involves chrismation or, in some cases, baptism. Each tradition has its own understanding of what membership means and what it requires. The practical considerations matter: if your spouse, your children, and your closest friendships are all embedded in your current church, switching carries relational cost. But staying in a community that violates your conscience carries spiritual cost. The honest question is not whether you are allowed to switch. It is whether you are switching toward something or running from something. Both can be legitimate. But running toward is usually more sustainable than running from.",
  },
  {
    question: "What should I look for in a church?",
    answer:
      "Look for a church that tells you the truth. Not a church that tells you what you want to hear, and not a church that uses truth as a weapon. A church that tells you the truth with tears in its eyes. Specifically: look for preaching that engages the actual text of Scripture with intellectual honesty -- that does not skip the hard passages, does not reduce the Bible to moral lessons, and does not use the pulpit as a political platform. Look for leadership that is accountable. Ask how the church handles conflict, how it manages finances, and what happens when a leader fails. If the answers are vague or defensive, that tells you something. Look for a community where people are known, not just counted. A church where your absence would be noticed within a week, not within a month. Look for theological depth -- a church that can hold the weight of suffering, doubt, and injustice without retreating into cliches. Look for honesty about failure. Every church has failed. The question is whether it admits it. Look for generosity -- not just financial, but spiritual. A church that is open to outsiders, curious about other traditions, and unafraid of questions. And look for worship that does not perform emotion but creates space for it. The right church will not be perfect. It will be honest. That is harder to find than it sounds, and more valuable than most people realize until they have experienced the alternative.",
  },
  {
    question: "What questions should I ask before joining a church?",
    answer:
      "Ask the questions the church hopes you will not ask. Ask about money: Where does the budget go? What percentage goes to staff salaries versus benevolence? Is the pastor's salary public? Ask about accountability: Who has the authority to discipline the lead pastor? What happens when a staff member is accused of misconduct? Is there an independent board, or does the pastor control the governance structure? Ask about theology: What is the church's position on women in leadership? On LGBTQ+ inclusion? On creation and evolution? On political engagement? These are not litmus tests. They are windows into how the church thinks and whether it can hold complexity. Ask about community: What does the church do for its members in crisis? Is there a care ministry? Do people actually know each other, or is the community limited to Sunday morning? Ask about the past: Has the church experienced a split? A scandal? How was it handled? The church's history of failure and repair tells you more than its mission statement. Ask about doubt: Is it safe to ask hard questions in this community? What happens when someone disagrees with the pastor publicly? And ask yourself: Am I looking for a church that will comfort me, or one that will form me? The answer to that question determines everything that follows. Comfort is easy to find. Formation is rare. Choose the one that makes you uneasy in the right ways.",
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
  name: "What Denomination Should I Join? 8 Questions Answered",
  description: "How to choose a church denomination. Main differences, what to look for, non-denominational pros and cons, and questions to ask before joining. Honest guidance from a working pastor.",
  url: "https://www.livewellbyjamesbell.co/faq/what-denomination-should-i-join",
  author: { "@type": "Person", name: "James Bell", url: "https://www.livewellbyjamesbell.co/about" },
  publisher: { "@type": "Organization", name: "LiveWell by James Bell" },
};

export default function WhatDenominationShouldIJoin() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      <SEOMeta
        title="What Denomination Should I Join? 8 Questions Answered"
        description="How to choose a church denomination. Main differences, what to look for, non-denominational pros and cons, and questions to ask before joining."
        keywords="what denomination should I join, choosing a church, church denominations differences, non-denominational church, how to find a church, switching denominations"
        structuredData={[faqSchema, webPageSchema]}
      />

      <section style={{ background: "var(--charcoal)", padding: "clamp(80px,12vw,160px) 24px 64px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>PEOPLE ALSO ASK</p>
        <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px,5vw,60px)", fontWeight: 400, color: "var(--charcoal-fg)", maxWidth: "780px", margin: "0 auto", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          What denomination should I join?
        </h1>
        <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "rgba(255,255,255,0.6)", marginTop: "32px", maxWidth: "560px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
          There are thousands of options and most of the advice you will receive is tribalism dressed as theology. Here is what actually matters.
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
            The full article maps the major Christian traditions, traces how they diverged, and helps you find the one that fits what you actually believe.
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
              { label: "Catholic vs. Protestant -- what is the difference?", href: "/faq/catholic-vs-protestant" },
              { label: "Why are people leaving the church?", href: "/faq/why-are-people-leaving-church" },
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
