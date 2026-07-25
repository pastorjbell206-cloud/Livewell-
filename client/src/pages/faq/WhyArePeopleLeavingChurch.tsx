import { Link } from "wouter";
import { useState } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const FAQ_ITEMS = [
  {
    question: "Why are people leaving the church?",
    answer:
      "The reasons are not singular, and anyone who reduces the exodus to one cause is selling something. But the data clusters around a few overlapping realities. First, institutional trust has collapsed across every sector of American life -- government, media, medicine, education -- and the church is not exempt. Gallup reported in 2022 that confidence in organized religion had fallen to 31%, the lowest in their polling history. Second, the politicization of the American church has alienated people who came for the gospel and found a voter guide. Third, clergy abuse scandals -- Catholic, Protestant, evangelical -- have revealed systemic failures of accountability that many congregations still refuse to address honestly. Fourth, the rise of the \"nones\" reflects a broader cultural shift in which religious identity is no longer inherited automatically. People born after 1980 are the first American generation for whom churchgoing is not a social expectation. And fifth, many people have not left the faith. They have left the building. The distinction matters enormously. They still pray, still read, still believe -- but they no longer trust the institution to steward what they believe. The church that wants to understand the exodus has to start by listening to the people who left, not by diagnosing them from a distance.",
  },
  {
    question: "What are the statistics on church decline?",
    answer:
      "The numbers are not ambiguous. Gallup's 2023 data showed that church membership in the United States dropped below 50% for the first time in 2020 and has continued to fall. In 1999, 70% of Americans belonged to a church, synagogue, or mosque. By 2023, that number sat at 45%. Pew Research Center's Religious Landscape Study found that the percentage of Americans who identify as Christian fell from 78% in 2007 to 63% in 2021. Meanwhile, the religiously unaffiliated -- the \"nones\" -- grew from 16% to 29% in the same period. Among adults under 30, the unaffiliated now represent the largest single category. Weekly church attendance has dropped from roughly 40% in the mid-1990s to around 30% today, with sharper declines during and after COVID-19. Some of those pandemic-era losses appear permanent. The Southern Baptist Convention has lost roughly 1.3 million members since 2006. The United Methodist Church has seen similar declines compounded by denominational splits. These are not peripheral shifts. They represent the most significant restructuring of American religious life since the Second Great Awakening. Whether it represents decline or correction depends entirely on what you think the church is for.",
  },
  {
    question: "Which denominations are losing the most members?",
    answer:
      "Mainline Protestantism has been hemorrhaging members for sixty years. The United Methodist Church, the Evangelical Lutheran Church in America, the Presbyterian Church (USA), and the Episcopal Church have all lost between 25% and 40% of their membership since the 1990s. The United Methodist Church's recent schism over sexuality has accelerated losses that were already severe -- over 7,000 congregations disaffiliated between 2019 and 2023. But the story is no longer just a mainline story. The Southern Baptist Convention, long considered the bellwether of American evangelicalism, peaked at 16.3 million members in 2006 and has fallen to roughly 13 million. The Catholic Church in America has seen Mass attendance drop from about 55% of self-identified Catholics in the 1960s to around 20% today. Non-denominational churches have grown during this same period, absorbing many of the displaced, but their growth has not offset the broader losses. And some of that growth is transfer growth -- Christians moving between churches -- rather than conversion growth. The denominations growing fastest globally are Pentecostal and charismatic traditions, particularly in the Global South. In America, the pattern is clear: institutions that tied their identity to cultural establishment are losing the people who no longer need cultural Christianity to belong.",
  },
  {
    question: "What age groups are leaving church the fastest?",
    answer:
      "The sharpest declines are among adults under 40, with the steepest drop concentrated between ages 18 and 29. Pew Research found that only 36% of Millennials (born 1981-1996) identify as Protestant or Catholic, compared to 67% of the Silent Generation (born 1928-1945). Among Gen Z adults (born 1997-2012), early data suggests even lower religious affiliation. The pattern is not primarily about age -- it is not that people leave when they are young and return when they have children. That was true for Baby Boomers, but it has not held for subsequent generations. Millennials who left in their twenties are now in their late thirties and forties, and the expected return has not materialized at scale. The reasons are generational: younger adults came of age during the clergy abuse crisis, the culture wars, the rise of the internet as an alternative meaning-making system, and the political capture of evangelical Christianity. They also came of age in a culture that prizes individual authenticity over institutional loyalty -- a value system that makes inherited religion feel incoherent. The church cannot solve this with better youth programs. It has to reckon with why a generation looked at the institution and decided it was not telling the truth.",
  },
  {
    question: "Can the trend of people leaving church be reversed?",
    answer:
      "That depends on what you mean by reversed. If the question is whether America will return to the cultural Christianity of the 1950s, the answer is no. That world was sustained by social pressure, racial homogeneity, and Cold War nationalism as much as by genuine faith. Its collapse is not entirely a loss. If the question is whether the church can become a place people choose rather than inherit, the answer is yes, but only through the kind of institutional reform most church leaders are unwilling to pursue. That means financial transparency -- full disclosure of budgets, salaries, and spending. It means accountability structures that do not protect leaders at the expense of the vulnerable. It means preaching that takes intellectual questions seriously rather than treating doubt as a spiritual deficiency. It means political independence -- refusing to function as the chaplain of any party. And it means theological depth. The churches that are growing, even modestly, tend to be the ones that refuse to dumb down the faith. People are not leaving because the gospel is too demanding. They are leaving because what they were offered was not demanding enough to be worth their lives. The trend reverses when the church becomes the thing it claims to be. Not before.",
  },
  {
    question: "Is leaving church the same as leaving God?",
    answer:
      "No. And the failure to make that distinction has caused enormous pastoral damage. Many people who have walked away from a congregation have not walked away from faith. They have walked away from an institution they experienced as dishonest, abusive, politically captured, or intellectually shallow. Some are still praying. Some are still reading Scripture. Some are wrestling with God more seriously than they did in the pew. The sociologists call them the \"dechurched\" -- people who retain belief but have abandoned institutional participation. The Barna Group estimated in 2023 that roughly 40 million American adults fit this category. That is not apostasy. It is a crisis of institutional trust. Of course, some people do leave God when they leave the church, because the church was the only framework they had for understanding God. When the framework collapses, everything inside it collapses too. That is the church's failure, not the individual's. It means we built faith on the institution rather than building the institution on faith. The pastoral response matters here. When someone tells you they left the church, the first question should not be \"Why did you leave?\" It should be \"What did you experience?\" The answer to the second question usually explains the first. And it usually indicts us more than it indicts them.",
  },
  {
    question: "What can churches do to stop people from leaving?",
    answer:
      "Stop trying to stop people from leaving. Start trying to become the kind of community no one has to recover from. That sounds glib, but it is the only honest starting point. The retention strategies most churches deploy -- better programs, slicker production, more relevant sermons -- address symptoms while ignoring the disease. The disease is a trust deficit, and trust is rebuilt only through structural change, not branding. Specifically: create real accountability for leaders, including independent boards with power to remove pastors. Publish finances. Stop treating questions as threats. Stop conflating political conservatism with orthodoxy. Invest in teaching that respects intelligence -- adults who read Dostoevsky and listen to podcasts about quantum physics are not going to sit through a sermon that treats the Bible like a fortune cookie. Practice church discipline consistently, starting at the top. When a pastor falls, the congregation's response tells the world everything about whether the church takes its own theology seriously. Address abuse directly and publicly. Create space for lament, not just worship. And be honest about what you do not know. The churches that are retaining members -- and even growing -- tend to share a few traits: theological seriousness, emotional honesty, structural transparency, and a willingness to sit with people in the wreckage rather than offering slogans from a safe distance.",
  },
  {
    question: "Is the decline of the church a crisis or a correction?",
    answer:
      "Both. And the ratio depends on which church you are talking about. The collapse of cultural Christianity -- the kind that existed because it was socially advantageous to attend church, the kind that provided religious cover for racism, nationalism, and economic self-interest -- is a correction. That version of the faith was always a distortion, and its decline is the historical norm reasserting itself. For most of Christian history, the church has been a minority community. Christendom -- the fusion of church and state, of faith and cultural power -- was a 1,700-year experiment that is ending. Its end is painful, but it may also be clarifying. The crisis is real where genuine communities of faith are dissolving, where people who need pastoral care have nowhere to turn, where children are growing up without any framework for meaning beyond consumption and self-expression. The crisis is real where the institutional failures of the church have driven people not just from the building but from God. The prophet Jeremiah watched the temple fall and called it both judgment and mercy. The judgment was on what Israel had made of God's house. The mercy was that God was not finished. The American church is living in a Jeremiah moment. Whether it becomes a story of renewal or decline depends on whether we grieve what deserves to be grieved and release what deserves to be released.",
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
  name: "Why Are People Leaving Church? 8 Questions Answered Honestly",
  description:
    "Why are people leaving the church? Statistics, reasons by age group, denominational losses, and what congregations can do. Honest answers from a working pastor.",
  url: "https://www.livewellbyjamesbell.co/faq/why-are-people-leaving-church",
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

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.livewellbyjamesbell.co/" },
    { "@type": "ListItem", position: 2, name: "Questions People Ask", item: "https://www.livewellbyjamesbell.co/faq" },
    { "@type": "ListItem", position: 3, name: "Why are people leaving church?", item: "https://www.livewellbyjamesbell.co/faq/why-are-people-leaving-church" },
  ],
};

export default function WhyArePeopleLeavingChurch() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      <SEOMeta
        title="Why Are People Leaving Church? 8 Questions Answered Honestly"
        description="Why are people leaving the church? Statistics, reasons by age group, denominational losses, and what congregations can do. Honest answers from a working pastor."
        keywords="why are people leaving church, church decline statistics, church membership dropping, leaving church but not God, church exodus, dechurched, nones"
        structuredData={[faqSchema, webPageSchema, breadcrumbSchema]}
      />

      {/* Hero */}
      <section
        style={{
          background: "var(--charcoal)",
          padding: "clamp(80px, 12vw, 160px) 24px 64px",
          textAlign: "center",
        }}
      >
        <p
          style={{
            fontFamily: "var(--U)",
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--mustard)",
            marginBottom: "24px",
          }}
        >
          PEOPLE ALSO ASK
        </p>
        <h1
          style={{
            fontFamily: "var(--F)",
            fontSize: "clamp(32px, 5vw, 60px)",
            fontWeight: 400,
            color: "var(--charcoal-fg)",
            maxWidth: "780px",
            margin: "0 auto",
            lineHeight: 1.15,
            letterSpacing: "-0.02em",
          }}
        >
          Why are people leaving the church?
        </h1>
        <p
          style={{
            fontFamily: "var(--U)",
            fontSize: "16px",
            color: "rgba(255,255,255,0.6)",
            marginTop: "32px",
            maxWidth: "560px",
            marginLeft: "auto",
            marginRight: "auto",
            lineHeight: 1.7,
          }}
        >
          The exodus is real, the reasons are complicated, and most explanations
          you have heard are wrong. A working pastor examines the data and the
          damage without pretending it is someone else's problem.
        </p>
      </section>

      {/* FAQ Accordion */}
      <section style={{ background: "var(--bone)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--U)",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--mustard-text)",
              marginBottom: "24px",
            }}
          >
            8 QUESTIONS ANSWERED
          </p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {FAQ_ITEMS.map((item, i) => (
              <div key={i} style={{ borderBottom: "1px solid rgba(0,0,0,0.08)" }}>
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    padding: "20px 0",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <h2
                    style={{
                      fontFamily: "var(--F)",
                      fontSize: "20px",
                      fontWeight: 400,
                      color: "var(--ink)",
                      margin: 0,
                    }}
                  >
                    {item.question}
                  </h2>
                  <span
                    style={{
                      fontFamily: "var(--U)",
                      fontSize: "18px",
                      color: "var(--ink-muted)",
                      flexShrink: 0,
                      marginLeft: "16px",
                      transition: "transform 200ms var(--ease)",
                      transform: openFaq === i ? "rotate(45deg)" : "none",
                    }}
                  >
                    +
                  </span>
                </button>
                {openFaq === i && (
                  <div style={{ paddingBottom: "24px" }}>
                    <p
                      style={{
                        fontFamily: "var(--B)",
                        fontSize: "15px",
                        color: "var(--ink-muted)",
                        lineHeight: 1.75,
                        maxWidth: "64ch",
                      }}
                    >
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "var(--charcoal)", padding: "80px 24px" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto", textAlign: "center" }}>
          <p
            style={{
              fontFamily: "var(--U)",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--mustard)",
              marginBottom: "24px",
            }}
          >
            GO DEEPER
          </p>
          <h2
            style={{
              fontFamily: "var(--F)",
              fontSize: "clamp(24px, 3vw, 36px)",
              fontWeight: 400,
              color: "var(--charcoal-fg)",
              marginBottom: "16px",
            }}
          >
            Read the full essay
          </h2>
          <p
            style={{
              fontFamily: "var(--U)",
              fontSize: "15px",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.7,
              marginBottom: "32px",
              maxWidth: "48ch",
              marginLeft: "auto",
              marginRight: "auto",
            }}
          >
            These answers are summaries. The full article traces the history,
            names the institutional failures, and asks what the church owes the
            people it lost.
          </p>
          <Link href="/answers" style={{ textDecoration: "none" }}>
            <span
              style={{
                display: "inline-block",
                background: "var(--bone)",
                color: "var(--ink)",
                fontFamily: "var(--U)",
                fontSize: "13px",
                fontWeight: 600,
                letterSpacing: "0.06em",
                padding: "15px 32px",
                borderRadius: "2px",
                borderBottom: "2px solid var(--mustard)",
              }}
            >
              Read the full article
            </span>
          </Link>
        </div>
      </section>

      {/* Related */}
      <section style={{ background: "var(--bone-warm)", padding: "64px 24px" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <p
            style={{
              fontFamily: "var(--U)",
              fontSize: "11px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "var(--mustard-text)",
              marginBottom: "24px",
            }}
          >
            RELATED QUESTIONS
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
            {[
              { label: "Why do young people leave church?", href: "/faq/why-do-young-people-leave-church" },
              { label: "What is deconstruction?", href: "/faq/what-is-deconstruction" },
              { label: "What is religious trauma?", href: "/faq/what-is-religious-trauma" },
            ].map((link) => (
              <Link key={link.href} href={link.href} style={{ textDecoration: "none" }}>
                <div
                  style={{
                    padding: "16px 0",
                    borderBottom: "1px solid rgba(0,0,0,0.08)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--F)",
                      fontSize: "18px",
                      fontWeight: 400,
                      color: "var(--ink)",
                    }}
                  >
                    {link.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--U)",
                      fontSize: "13px",
                      color: "var(--mustard-text)",
                    }}
                  >
                    Read
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
