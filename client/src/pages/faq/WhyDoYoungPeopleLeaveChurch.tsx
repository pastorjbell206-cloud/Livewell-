import { Link } from "wouter";
import { useState } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const FAQ_ITEMS = [
  {
    question: "What are the top reasons young people leave the church?",
    answer:
      "The research is consistent across multiple studies, and the answers are not what most church leaders want to hear. The Barna Group's landmark study, published in the book \"You Lost Me\" by David Kinnaman, identified six primary reasons: the church feels overprotective (sheltering young people from the world rather than equipping them to engage it), shallow (offering easy answers to hard questions), anti-science (forcing a false choice between faith and intellectual honesty), repressive about sexuality (reducing the entire moral conversation to sexual behavior), exclusive (claiming to have a monopoly on truth while dismissing every other perspective), and unfriendly to doubt (treating questions as threats rather than signs of growth). The Fuller Youth Institute's \"Growing Young\" research added that churches retaining young adults tend to share three characteristics: they take the faith of young people seriously (not as a junior version of adult faith), they engage with the hard questions rather than deflecting them, and they give young adults meaningful responsibility rather than relegating them to the youth group until they are old enough to matter. What young people are not saying is that the gospel is too hard or too demanding. They are saying the opposite: what they were offered was not demanding enough to be worth their lives. The church lost them not by asking too much but by offering too little.",
  },
  {
    question: "At what age do most people leave the church?",
    answer:
      "The most common window is between 18 and 22, which corresponds with the transition from living under parental authority to living independently. The LifeWay Research study found that 66% of young adults who attended church regularly as teenagers stopped attending for at least a year between ages 18 and 22. The reasons are both developmental and circumstantial. Developmentally, this is the period when inherited identity gives way to chosen identity -- when young adults begin to distinguish between what they believe and what they were told to believe. The move to college or independent living removes the social infrastructure that supported church attendance: parental expectations, peer groups, familiar community. Many young people discover that their faith was carried by those structures rather than by conviction, and when the structures are removed, the faith has nothing to stand on. The departure is not always dramatic. Many young adults do not have a crisis of faith. They simply drift. Sunday becomes a day for sleeping in. The community they valued is replaced by new relationships. The sermons feel irrelevant to the questions they are actually asking. The drift is harder for churches to address than the crisis, because the drifters do not leave angry. They leave indifferent. And indifference is harder to reverse than anger, because anger still cares. The church that wants to keep its young adults has to give them something worth staying for before they reach the age when staying is no longer required.",
  },
  {
    question: "Do young people who leave church eventually come back?",
    answer:
      "The historical pattern was yes -- the \"life cycle\" theory of religious participation held that people leave in their twenties and return in their thirties when they marry and have children. That pattern held for the Baby Boom generation. It has not held for subsequent generations, and assuming it will is one of the most dangerous forms of institutional complacency. LifeWay Research found that roughly 35% of young adults who left church eventually returned, but the majority did not. And the rate of return has been declining with each successive generation. Millennials who left in their twenties are now in their late thirties and forties, and the expected mass return has not materialized. Gen Z's early data suggests even lower return rates. The reasons are structural, not cyclical. Previous generations returned because church was socially expected, because their spouse's family attended, because children needed moral formation and church was the default provider. Those social pressures have diminished dramatically. Non-attendance is no longer stigmatized. Moral formation is sought through other channels. Marriage itself is declining, and when young adults do marry, they often marry someone who is also unaffiliated. The church cannot afford to wait for them to come back. The conditions that produced the return no longer exist. The young adults who leave today are leaving a culture that no longer assumes their return, and many of them are building lives -- meaningful, moral, community-rich lives -- without the church. That is the competition. And it is formidable.",
  },
  {
    question: "What do young people want from church?",
    answer:
      "The research consistently points to four things, and none of them are what most churches are offering. First, intellectual honesty. Young adults want a church that takes their questions seriously, engages with the strongest objections to the faith, and does not treat doubt as a spiritual disease. They have access to every counterargument on the internet, and a church that pretends those arguments do not exist is a church that cannot be trusted. Second, relational depth. Young adults are lonelier than any previous generation -- the data on this is overwhelming -- and they are looking for community that goes deeper than a Sunday morning greeting. They want to be known, not just counted. Small groups, mentoring relationships, shared meals, honest conversation about failure and struggle. Third, justice and action. Young adults want a faith that makes a tangible difference in the world. They are less interested in what you believe about heaven and more interested in what you are doing about poverty, racism, the environment, and the vulnerable. A church that preaches about love and does nothing about injustice reads as hypocritical. Fourth, space for complexity. Young adults live in a world of moral and intellectual complexity, and a church that offers only binary answers -- saved/unsaved, right/wrong, us/them -- feels inadequate to the reality they experience. They want a faith that can hold tension, that can say \"I do not know\" without collapsing, that is strong enough to contain disagreement. The churches that are retaining young adults are the ones that offer all four. There are not many of them. But they exist.",
  },
  {
    question: "How does politics affect young people leaving church?",
    answer:
      "The political capture of American evangelicalism has been catastrophic for its relationship with young adults, and the data on this is unambiguous. A 2022 survey by the Survey Center on American Life found that the single most common reason young adults gave for leaving their childhood religion was that it became too focused on politics. This is not a vague complaint. Young adults watched the church align itself with a specific political party, prioritize political power over prophetic witness, and defend political leaders whose personal conduct violated every value the church claimed to hold. The hypocrisy was not subtle. It was broadcast on national television. For young adults who had been taught that character matters, that integrity is non-negotiable, and that the church answers to a higher authority than the state, the political captivity of the church was not a policy disagreement. It was a betrayal of the gospel they had been taught. The damage is not limited to one political direction. Young adults are alienated by the right's fusion of faith and nationalism and by the left's fusion of faith and progressive ideology. They want a church that is politically independent -- that speaks prophetically to every party, that refuses to be anyone's chaplain, and that evaluates every policy by the standards of the kingdom rather than the platform of a party. The churches that have maintained political independence have fared far better with young adults than those that have not. That is not a coincidence.",
  },
  {
    question: "How does the LGBTQ+ debate affect young people in church?",
    answer:
      "This is one of the most significant fault lines between the institutional church and young adults, and pretending otherwise serves no one. Pew Research found that 79% of American adults ages 18-29 support same-sex marriage, compared to 52% of those 50-64 and 41% of those 65 and older. For young adults raised in churches that teach traditional sexual ethics, the tension is acute. Many have close friends, family members, or personal experiences that make the traditional position feel not just wrong but cruel. The Public Religion Research Institute found that 54% of young adults who left their childhood religion cited negative treatment of LGBTQ+ people as an important factor. This does not mean the church should simply adopt the majority position of its youngest members. Theology is not a popularity contest. But it does mean the church needs to reckon honestly with how it has communicated on this issue. The difference between a church that says \"We believe marriage is between a man and a woman, and we grieve that this conviction causes pain, and we commit to treating every person with the dignity they bear as an image of God\" and a church that mocks, demonizes, or dehumanizes LGBTQ+ people is the difference between a church that loses young adults on principle and a church that loses them through cruelty. Many churches have not earned the right to hold a traditional position because they have held it with contempt rather than with tears. Young adults can smell the difference.",
  },
  {
    question: "What strategies actually work to keep young people in church?",
    answer:
      "The Fuller Youth Institute's \"Growing Young\" research, based on a study of 250 congregations that successfully engaged young adults, identified six core commitments. First, unlocking keychain leadership: giving young adults actual authority and decision-making power rather than tokenizing them. Not a youth council that reports to the adult board. Real seats at the real table. Second, empathizing with today's young people: understanding their world rather than mourning the loss of a world that no longer exists. This means listening to their actual concerns rather than projecting your concerns onto them. Third, taking Jesus's message seriously: centering the teaching on the radical demands of Jesus rather than on cultural Christianity or political identity. Fourth, fueling a warm community: creating an environment of relational warmth, belonging, and genuine care that goes beyond Sunday morning. Fifth, prioritizing young people and families everywhere: not just in the youth ministry but in the budget, the governance, the sermon illustrations, the worship planning. Sixth, being the best neighbors: engaging with the surrounding community through service, justice, and genuine presence. What the research did not find: that technology, worship style, or programmatic innovation made the difference. The churches that retained young adults were not necessarily the ones with the best production values. They were the ones that treated young adults as partners in the mission rather than as a demographic to be retained. That distinction is everything.",
  },
  {
    question: "How are generational differences affecting the church?",
    answer:
      "The generational differences are real, but they are often described in ways that obscure the actual dynamics. The common narrative -- that older generations are faithful and younger ones are fickle -- is both self-serving and historically illiterate. Every generation has struggled with the faith it inherited. The Silent Generation produced the sexual revolution. The Boomers produced the megachurch movement and its celebrity culture. Gen X produced the seeker-sensitive model that stripped worship of theological content. Each generation created problems that the next one had to inherit. What distinguishes the current generational divide is the collapse of cultural Christianity as a social support structure. Previous generations could attend church casually because the culture rewarded it. For Gen Z and younger Millennials, church attendance carries no social benefit and, in many peer groups, a social cost. The people who remain are the ones who have chosen to be there, which means the church of the future will be smaller and more committed. That is not necessarily bad. It may be more honest. The generational challenge for the church is not to make itself appealing to young people -- that produces the worst kind of pandering. It is to be the kind of community that deserves the commitment it asks for. A community that tells the truth, serves the vulnerable, holds its leaders accountable, and takes the life of the mind seriously. That community will attract people of every generation. The community that fails those tests will lose them all, eventually. The young just leave first.",
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
  name: "Why Do Young People Leave Church? 8 Questions Answered",
  description: "Why do young people leave church? Top reasons, the age most leave, whether they come back, and what actually works to keep them. Research-based answers from a working pastor.",
  url: "https://www.livewellbyjamesbell.co/faq/why-do-young-people-leave-church",
  author: { "@type": "Person", name: "James Bell", url: "https://www.livewellbyjamesbell.co/about" },
  publisher: { "@type": "Organization", name: "LiveWell by James Bell" },
};

export default function WhyDoYoungPeopleLeaveChurch() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      <SEOMeta
        title="Why Do Young People Leave Church? 8 Questions Answered"
        description="Why do young people leave church? Top reasons, the age most leave, whether they come back, and what actually works to keep them. Research-based answers from a working pastor."
        keywords="why young people leave church, youth leaving church, Gen Z leaving church, millennials leaving church, church attendance decline youth, keeping young people in church"
        structuredData={[faqSchema, webPageSchema]}
      />

      <section style={{ background: "var(--charcoal)", padding: "clamp(80px,12vw,160px) 24px 64px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>PEOPLE ALSO ASK</p>
        <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px,5vw,60px)", fontWeight: 400, color: "white", maxWidth: "780px", margin: "0 auto", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          Why do young people leave the church?
        </h1>
        <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "rgba(255,255,255,0.6)", marginTop: "32px", maxWidth: "560px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
          The answers are in the research. The church has mostly refused to read it. A pastor with five sons examines what the data actually says.
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
            The full article traces the research, names the institutional failures, and asks what a church worth staying for would look like.
          </p>
          <Link href="/writing/why-young-adults-arent-coming-back" style={{ textDecoration: "none" }}>
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
