import { Link } from "wouter";
import { useState } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const FAQ_ITEMS = [
  {
    question: "What are the main differences between Catholic and Protestant Christianity?",
    answer:
      "The differences are significant, and they cluster around five core issues. First, authority. Catholics hold that the Bible and Sacred Tradition, as interpreted by the Magisterium (the Pope and bishops in communion with him), are the joint sources of divine revelation. Protestants hold to sola Scriptura -- Scripture alone as the final authority in matters of faith and practice, though they disagree among themselves about what that means in application. Second, salvation. Catholics teach that salvation is a process involving grace, faith, and works -- that baptism initiates salvation, the sacraments sustain it, and good works are necessary evidence of genuine faith. Protestants, following Luther and Calvin, teach sola fide -- justification by grace through faith alone, with good works as a fruit of salvation but not a cause of it. Third, the sacraments. Catholics recognize seven sacraments; most Protestants recognize two. Catholics believe the bread and wine become the actual body and blood of Christ (transubstantiation); Protestants hold varying views from real presence (Lutherans) to symbolic memorial (most evangelicals). Fourth, the structure of the church. Catholics have a hierarchical structure with the Pope as the head of the visible church on earth. Protestants reject papal authority and vary from episcopal (bishops) to presbyterian (elders) to congregational governance. Fifth, the role of Mary and the saints. Catholics venerate Mary and the saints as intercessors; Protestants generally view this as unbiblical. These are not trivial differences. They are disagreements about how God saves, how the church is governed, and where authority resides. They matter.",
  },
  {
    question: "Can Catholics be saved? (Protestant perspective)",
    answer:
      "The majority of Protestant theology has historically answered yes, though with significant qualification. The Reformers -- Luther, Calvin, Zwingli -- objected to what they saw as distortions of the gospel within Catholicism, particularly the sale of indulgences, the doctrine of purgatory, and the elevation of papal authority. But they did not declare all Catholics to be outside the faith. Luther distinguished between the Roman institution, which he believed had corrupted the gospel, and individual Catholics who trusted in Christ. Calvin, despite his fierce polemics against Rome, acknowledged the Catholic Church as retaining elements of the true church. The Westminster Confession of Faith, a foundational Reformed document, calls the Pope the Antichrist -- which is about as harsh as Protestant rhetoric gets -- but still recognizes baptized Catholics as having received a valid Christian sacrament. In the modern period, most mainstream Protestant denominations -- including the World Council of Churches and even many evangelical bodies -- recognize Catholic baptism and acknowledge Catholics as fellow Christians. The evangelical concern is typically not whether Catholics can be saved but whether Catholic theology, in its official formulations, makes salvation dependent on works and sacraments in a way that obscures the sufficiency of Christ's atoning death. The concern is real, and it is worth discussing honestly. But the claim that no Catholic has ever been a genuine Christian is a position held by a fringe, not by the mainstream of Protestant theology.",
  },
  {
    question: "Can Protestants be saved? (Catholic perspective)",
    answer:
      "The Catholic Church has been remarkably clear on this question, particularly since the Second Vatican Council (1962-1965). The Council's decree Unitatis Redintegratio (Decree on Ecumenism) acknowledged that \"some and even very many of the significant elements and endowments which together go to build up and give life to the Church itself, can exist outside the visible boundaries of the Catholic Church.\" Lumen Gentium, the Council's dogmatic constitution on the Church, stated that those who are baptized and believe in Christ are \"in some real way joined to us in the Holy Spirit.\" The Council did not declare Protestant churches to be equivalent to the Catholic Church -- it distinguished between \"churches\" (with valid apostolic succession, like the Orthodox) and \"ecclesial communities\" (Protestant bodies). But it affirmed that salvation is possible outside the visible boundaries of the Catholic Church, both for Protestants and for non-Christians of good will. This represented a development from earlier, more exclusivist positions -- particularly the medieval maxim \"extra ecclesiam nulla salus\" (outside the church there is no salvation), which had been interpreted rigidly by some theologians. The Catechism of the Catholic Church (paragraphs 836-848) affirms that God's saving grace is not limited to Catholics. The Catholic position today is that the fullness of the means of salvation subsists in the Catholic Church, but that God's grace works beyond its visible boundaries. Protestants are regarded as separated brethren, not as outsiders to the faith.",
  },
  {
    question: "Why did Catholics and Protestants split?",
    answer:
      "The split did not happen in a day, and its causes were as much political and economic as theological. The conventional date is October 31, 1517, when Martin Luther posted his 95 Theses on the door of the Castle Church in Wittenberg. The immediate cause was the sale of indulgences -- the practice of offering remission of temporal punishment for sin in exchange for financial contributions to the church. Johann Tetzel's famous pitch -- \"As soon as a coin in the coffer rings, the soul from purgatory springs\" -- was the catalyst, but the underlying issues ran deeper. Luther had been wrestling with the doctrine of justification: how does a sinner stand right before God? His study of Romans led him to the conclusion that justification is by grace alone through faith alone -- a direct challenge to the Catholic sacramental system, which taught that grace was mediated through the church's rites. The political context made the split possible. German princes saw an opportunity to assert independence from Rome. The printing press allowed Luther's ideas to spread faster than the church could contain them. Henry VIII's break with Rome was more about divorce than doctrine. The Counter-Reformation at the Council of Trent (1545-1563) addressed some abuses but hardened the doctrinal lines. The result was a fracture that produced centuries of violence, theological creativity, institutional proliferation, and the global diversity of Christianity we know today. The split was not inevitable. It was the product of genuine theological conviction meeting institutional corruption meeting political opportunity. Whether it was a tragedy or a necessary correction depends on where you stand -- and both answers contain truth.",
  },
  {
    question: "What role does Mary play in Catholic and Protestant theology?",
    answer:
      "Mary is one of the sharpest points of divergence between Catholic and Protestant theology, and the disagreement runs deeper than most popular treatments suggest. Catholic teaching holds four Marian dogmas: Mary's divine motherhood (Theotokos, affirmed at the Council of Ephesus in 431 -- a dogma Protestants also accept), her perpetual virginity (she remained a virgin before, during, and after the birth of Jesus), the Immaculate Conception (Mary was conceived without original sin, defined as dogma in 1854), and the Assumption (Mary was taken body and soul into heaven, defined in 1950). Catholics also practice Marian devotion -- the Rosary, Marian feast days, and prayers asking Mary to intercede with God on their behalf. The theology distinguishes between latria (worship, which is owed to God alone) and dulia (veneration, which is given to the saints) and hyperdulia (the special veneration given to Mary). Protestants generally accept Mary as the mother of Jesus and honor her obedience and faith as described in the Gospels. But most Protestants reject the perpetual virginity (citing biblical references to Jesus's brothers), the Immaculate Conception, and the Assumption as having no clear biblical basis. They view Marian devotion as, at best, extra-biblical and, at worst, a form of idolatry that displaces the unique mediatorship of Christ. The debate is ultimately about the relationship between Scripture and tradition. Catholics argue that Marian doctrine developed organically under the guidance of the Holy Spirit. Protestants argue that doctrine must be grounded in Scripture and that the later Marian dogmas represent additions to the faith rather than developments of it.",
  },
  {
    question: "What is the role of the Pope in Christianity?",
    answer:
      "The papacy is the single most divisive structural issue between Catholic and non-Catholic Christianity, and it has been contested since the earliest centuries of the church. The Catholic position holds that Jesus appointed Peter as the head of the apostles (\"You are Peter, and on this rock I will build my church,\" Matthew 16:18), that Peter served as the first bishop of Rome, and that the Pope inherits Peter's authority as the Vicar of Christ -- the visible head of the universal church on earth. The First Vatican Council (1870) defined papal infallibility: when the Pope speaks ex cathedra (from the chair of Peter) on matters of faith and morals, he is preserved from error by the Holy Spirit. This has been invoked only once since the definition -- for the Assumption of Mary in 1950. The Orthodox churches broke with Rome in 1054 partly over papal claims. They recognize the bishop of Rome as holding a primacy of honor among equals (primus inter pares) but reject his claim to universal jurisdiction and infallibility. The Orthodox view is that authority resides in the consensus of ecumenical councils, not in a single bishop. Protestants reject papal authority entirely. Luther called the papacy a human institution. Calvin argued that no single bishop can claim authority over the universal church. Most Protestants view the Petrine texts as referring to Peter's confession of faith, not to an office of succession. The question of the papacy is not just about one man's title. It is about where authority resides in the church, how doctrine develops, and whether visible institutional unity requires a visible institutional head. These are questions worth arguing about. They are not questions that should prevent Christians from recognizing one another.",
  },
  {
    question: "What is the role of saints in Catholic vs. Protestant theology?",
    answer:
      "The word \"saint\" means different things in Catholic and Protestant usage, and the difference illuminates a deeper theological divide. In Protestant theology, all believers are saints -- the word is used throughout Paul's letters to describe ordinary Christians. There is no special category of sanctity, no formal process of canonization, and no practice of invoking deceased believers as intercessors. The Protestant position is that Christ is the sole mediator between God and humanity (1 Timothy 2:5), and that asking deceased saints to pray for you is, at best, unnecessary and, at worst, a violation of that unique mediatorship. In Catholic theology, all baptized Christians are members of the communion of saints, but certain individuals who lived lives of heroic virtue and holiness are formally recognized through the process of canonization. Canonization involves investigation, the verification of miracles attributed to the saint's intercession, and a formal declaration by the Pope. Canonized saints are not worshiped -- worship is reserved for God alone -- but they are venerated as models of holiness and invoked as intercessors. The theological basis is the communion of saints: the belief that the body of Christ includes both the living and the dead, and that the saints in heaven remain actively connected to the church on earth. The practice of asking saints to pray for you is seen as no different in principle from asking a living friend to pray for you -- except that the saint is in the direct presence of God. The debate is ultimately about the nature of death and the communion of saints. Catholics see the boundary between the living and the dead as permeable. Protestants see it as firm until the resurrection.",
  },
  {
    question: "Which came first -- Catholic or Protestant Christianity?",
    answer:
      "This question is more complicated than it appears, and both traditions have a tendency to claim more historical continuity than the evidence supports. The Catholic Church traces its lineage directly to the apostles, through an unbroken succession of bishops from Peter to the current Pope. In institutional terms, the Catholic Church is the oldest continuously operating institution in Western civilization. The structures, liturgy, and many doctrines recognizable as \"Catholic\" were in place by the late second century -- the threefold ministry of bishops, priests, and deacons, the celebration of the Eucharist as the central act of worship, the emerging authority of the bishop of Rome. Protestantism began in the sixteenth century. That is a historical fact. But Protestants do not concede that they invented a new religion. They argue that the Reformation was a return to the original faith of the apostles -- that medieval Catholicism had accumulated doctrines and practices (indulgences, purgatory, papal infallibility, Marian dogmas) that were departures from the apostolic faith, and that the Reformation stripped away the accretions to recover the original. The Orthodox churches, for their part, argue that they are the oldest church -- that Roman Catholicism was the one that departed from the common tradition in 1054 by adding the filioque clause to the Nicene Creed and claiming universal papal jurisdiction. The honest answer is that the Christianity of the first century looked like none of the current traditions. It was a Jewish messianic movement that became a Gentile religion, and every tradition since is an attempt to faithfully transmit what was received. How well each tradition has succeeded is precisely what the argument is about.",
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
  name: "Catholic vs. Protestant: 8 Key Differences Explained",
  description: "What is the difference between Catholic and Protestant Christianity? Main differences, the Pope, Mary, saints, salvation, and which is older. Honest answers.",
  url: "https://www.livewellbyjamesbell.co/faq/catholic-vs-protestant",
  author: { "@type": "Person", name: "James Bell", url: "https://www.livewellbyjamesbell.co/about" },
  publisher: { "@type": "Organization", name: "LiveWell by James Bell" },
};

export default function WhatIsTheDifferenceBetweenCatholicAndProtestant() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      <SEOMeta
        title="Catholic vs. Protestant: 8 Key Differences Explained"
        description="What is the difference between Catholic and Protestant Christianity? Main differences, the Pope, Mary, saints, salvation, and which is older."
        keywords="Catholic vs Protestant, difference between Catholic and Protestant, can Catholics be saved, Pope, Mary in Christianity, saints, Catholic Protestant split"
        structuredData={[faqSchema, webPageSchema]}
      />

      <section style={{ background: "var(--charcoal)", padding: "clamp(80px,12vw,160px) 24px 64px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>PEOPLE ALSO ASK</p>
        <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px,5vw,60px)", fontWeight: 400, color: "var(--charcoal-fg)", maxWidth: "780px", margin: "0 auto", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          What is the difference between Catholic and Protestant?
        </h1>
        <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "rgba(255,255,255,0.6)", marginTop: "32px", maxWidth: "560px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
          The split is 500 years old, the issues are still alive, and most explanations oversimplify both sides. Here is what actually divides them.
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
          <h2 style={{ fontFamily: "var(--F)", fontSize: "clamp(24px,3vw,36px)", fontWeight: 400, color: "var(--charcoal-fg)", marginBottom: "16px" }}>Read the full comparison</h2>
          <p style={{ fontFamily: "var(--U)", fontSize: "15px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, marginBottom: "32px", maxWidth: "48ch", marginLeft: "auto", marginRight: "auto" }}>
            The full article traces the historical, theological, and practical differences with the depth both traditions deserve.
          </p>
          <Link href="/compare/catholic-vs-protestant" style={{ textDecoration: "none" }}>
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
              { label: "What denomination should I join?", href: "/faq/what-denomination-should-i-join" },
              { label: "What do Christians believe about hell?", href: "/faq/what-do-christians-believe-about-hell" },
              { label: "Is the Bible historically accurate?", href: "/faq/is-the-bible-historically-accurate" },
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
