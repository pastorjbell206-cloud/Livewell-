import { Link } from "wouter";
import { useState } from "react";
import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";

const FAQ_ITEMS = [
  {
    question: "What do historians agree on about the Bible?",
    answer:
      "The consensus among historians -- including secular scholars with no theological commitments -- is more substantial than most people on either side of the debate realize. Virtually all scholars of antiquity agree that Jesus of Nazareth existed, was baptized by John the Baptist, gathered followers in Galilee, and was crucified under Pontius Pilate around 30-33 AD. This is attested not only by the New Testament but by Josephus, Tacitus, Pliny the Younger, and the Talmud. The existence of ancient Israel, the Babylonian exile, the Second Temple period, and the broad outlines of Israelite history as described in Kings and Chronicles are confirmed by Assyrian, Babylonian, and Persian records. The Tel Dan inscription, discovered in 1993, confirmed the existence of the House of David. The Merneptah Stele, dated to around 1208 BC, is the earliest extra-biblical reference to Israel. Where historians diverge from biblical accounts is primarily in matters of scope and supernatural claims. The exodus, for example, has limited archaeological evidence for the scale described in the text. The conquest of Canaan appears more complex than the book of Joshua presents. But the claim that the Bible is pure fiction, invented centuries after the events it describes, is not a position held by serious historians. The question is not whether the Bible is historically grounded. It is how to interpret a collection of texts that are simultaneously historical, theological, literary, and liturgical.",
  },
  {
    question: "What archaeological evidence supports the Bible?",
    answer:
      "The archaeological record has consistently confirmed the historical context of the Bible, even when it has complicated specific narrative details. The Dead Sea Scrolls, discovered between 1947 and 1956, confirmed that the Hebrew Bible had been transmitted with remarkable accuracy over more than a thousand years. The Great Isaiah Scroll, dated to roughly 125 BC, is nearly identical to the medieval Masoretic text that underlies modern translations. The Pool of Siloam, referenced in John 9, was excavated in 2004. The Pool of Bethesda, described in John 5, was discovered in the 19th century with the precise five-portico structure the text describes -- a detail so specific that scholars had previously assumed it was symbolic rather than architectural. Hezekiah's tunnel, mentioned in 2 Kings 20 and 2 Chronicles 32, was discovered in 1838 with an inscription describing its construction. The Pilate Stone, found at Caesarea Maritima in 1961, confirmed Pontius Pilate's historicity and title. Excavations at Jericho, Hazor, Megiddo, and Lachish have illuminated the world the Bible describes. The Cyrus Cylinder confirms the Persian policy of returning exiled peoples to their homelands, consistent with the biblical account of the return from Babylon. None of this proves the theological claims of the Bible. Archaeology cannot verify a resurrection. But the claim that the Bible has no historical foundation is contradicted by a century of excavation.",
  },
  {
    question: "Does the Bible contradict itself?",
    answer:
      "The Bible contains apparent contradictions, and pretending otherwise does not serve the text or the reader. The two creation accounts in Genesis 1 and 2 present different sequences. The genealogies in Matthew and Luke differ. The synoptic gospels and John place events in different orders. The number of angels at the tomb varies between accounts. Samuel and Chronicles give different numbers for the same census. How you interpret these depends on what you think the Bible is. If you believe it is a divinely dictated encyclopedia that must be factually uniform in every detail, these discrepancies are devastating. If you understand it as a collection of texts written by different authors in different centuries for different communities, using different literary conventions, the variations are expected and often illuminating. The four gospels do not agree on every detail of the resurrection narratives -- but they all agree that the tomb was empty and that the disciples were transformed by an encounter they could not explain. The variations actually function as evidence of independent testimony rather than coordinated fabrication. Ancient historiography did not operate by modern standards of precision. Numbers were symbolic. Chronology was theological. The biblical authors were not trying to produce court transcripts. They were bearing witness. The honest reader takes the contradictions seriously, examines them in their literary and historical context, and resists the false choice between perfect harmony and complete unreliability.",
  },
  {
    question: "Who wrote the Gospels and when?",
    answer:
      "The traditional attributions are Matthew, Mark, Luke, and John. The earliest manuscripts do not include author names in the text itself, but the attributions are very early -- Papias of Hierapolis, writing around 110-130 AD, attributes the first Gospel to Matthew and the second to Mark, who he says recorded Peter's testimony. The scholarly consensus dates Mark to around 65-70 AD, Matthew and Luke to the 80s, and John to the 90s. These dates place the gospels within living memory of the events they describe -- Mark was likely written 30-35 years after the crucifixion, roughly the distance between the present and the early 1990s. The gospel authors were drawing on earlier sources. Luke explicitly says so in his opening verses. The hypothetical Q source, the special Matthean material, and the special Lukan material suggest a rich oral and written tradition circulating in the decades before the gospels were composed. Whether the traditional attributions are accurate is debated. Most scholars believe Mark's gospel reflects Petrine tradition even if Mark himself did not write it. Luke may well be the companion of Paul mentioned in the epistles. The authorship of Matthew and John is more contested. But the question of authorship should not obscure the more important question: these texts emerged from communities that knew the eyewitnesses, preserved their testimony, and staked their lives on its truth. The gospels are not anonymous fiction. They are the theological witness of the earliest church.",
  },
  {
    question: "How were the books of the Bible chosen?",
    answer:
      "The formation of the biblical canon was not a single event but a centuries-long process of recognition. The popular narrative -- that a council of bishops sat down and voted on which books to include -- is a simplification that borders on fiction. The core of the Old Testament canon was functionally established by the time of Jesus. The Torah (five books of Moses), the Prophets, and most of the Writings were accepted as authoritative by Second Temple Judaism. Jesus quotes from these texts as Scripture. The New Testament canon developed more gradually. Paul's letters were circulating and being read in churches by the 50s AD -- within two decades of the crucifixion. The four gospels were widely accepted by the end of the second century. Irenaeus, writing around 180 AD, argued that there were four gospels and only four, corresponding to the four corners of the earth. The Muratorian Fragment, dated to roughly the same period, lists most of the books in the current New Testament. The formal ratification came at councils like Hippo (393 AD) and Carthage (397 AD), but these councils were recognizing what the churches had already been using for centuries, not imposing a selection from above. The criteria were apostolic origin, consistency with the received faith, and widespread use across churches. Books like the Gospel of Thomas and the Gospel of Judas were excluded not by political conspiracy but because they were late, gnostic in theology, and not used by the mainstream churches. The canon was not manufactured. It was discerned.",
  },
  {
    question: "Has the Bible been changed over time?",
    answer:
      "The short answer is: far less than most people assume. The long answer requires distinguishing between the Old Testament and the New Testament. For the Old Testament, the Dead Sea Scrolls provided a dramatic test case. The scrolls, copied between roughly 250 BC and 68 AD, include fragments of every Old Testament book except Esther. When compared to the Masoretic Text -- the standard Hebrew Bible copied by medieval scribes -- the agreement was extraordinary. The Great Isaiah Scroll, containing all 66 chapters, showed a 95% agreement with the medieval text over a span of more than a thousand years. The differences were mostly minor spelling variations and copyist errors. For the New Testament, we have over 5,800 Greek manuscripts, plus thousands in Latin, Syriac, Coptic, and other languages. No two handwritten manuscripts are identical, and scholars have catalogued roughly 400,000 textual variants. That number sounds alarming until you realize that the vast majority are spelling differences, word order variations, or obvious scribal errors. The variants that affect meaning are a tiny fraction, and none of them alter any core Christian doctrine. Bart Ehrman, perhaps the most prominent textual critic and himself an agnostic, has acknowledged that the text of the New Testament is better attested than any other ancient document. The Bible has not been perfectly preserved. But the claim that it has been radically altered is not supported by the manuscript evidence.",
  },
  {
    question: "What are the oldest Bible manuscripts?",
    answer:
      "The oldest known fragment of the New Testament is Papyrus 52 (P52), a credit-card-sized piece of the Gospel of John dated to approximately 125 AD -- less than a century after the events it describes. The oldest substantial manuscripts of the New Testament are the great codices of the fourth and fifth centuries: Codex Sinaiticus (circa 330-360 AD), discovered at St. Catherine's Monastery in the Sinai Peninsula, contains the entire New Testament and most of the Old Testament in Greek. Codex Vaticanus (circa 300-325 AD), held in the Vatican Library, is considered by many scholars to be the single most important manuscript. For the Old Testament, the Dead Sea Scrolls push our manuscript evidence back to the third century BC. The Nash Papyrus, containing the Ten Commandments and the Shema, dates to roughly 150 BC. The Aleppo Codex, the oldest complete or near-complete manuscript of the Hebrew Bible, dates to approximately 930 AD. By comparison, the oldest surviving manuscripts of most classical authors -- Homer, Plato, Aristotle, Thucydides -- date to centuries or even a millennium after the originals. We have roughly 10 manuscripts of Caesar's Gallic Wars, the earliest from the ninth century, some 900 years after composition. The New Testament has over 5,800 Greek manuscripts. The manuscript evidence for the Bible is not just good. By the standards of ancient literature, it is without parallel.",
  },
  {
    question: "How should you read the Bible honestly?",
    answer:
      "Honestly means without predetermined conclusions in either direction. It means not reading the Bible to confirm what you already believe, and not reading it to find reasons to dismiss it. An honest reading begins with genre awareness. The Bible is not one book. It is a library -- sixty-six texts written over roughly a thousand years in three languages by dozens of authors. It contains history, poetry, prophecy, law, wisdom literature, apocalyptic vision, personal letters, and theological narrative. Reading Revelation the same way you read Romans is like reading a sonnet the same way you read a tax return. It means reading in context. Every text was written to a specific community in a specific historical moment. Paul's letters to Corinth address problems in Corinth. The prophets address the political realities of their day. Ignoring context produces the kind of proof-texting that has justified slavery, misogyny, and genocide. It means reading with humility -- recognizing that you are separated from these texts by language, culture, and millennia, and that your interpretation is not identical to the text itself. It means engaging with scholarship -- the work of textual critics, historians, archaeologists, and linguists who have spent their careers studying these documents. And it means reading with the tradition -- recognizing that you are not the first person to wrestle with these texts, and that the centuries of Christian, Jewish, and scholarly interpretation have something to teach you. Read it the way you would read any text you took seriously: carefully, critically, and with the expectation that it might change your mind.",
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
  name: "Is the Bible Historically Accurate? 8 Questions Answered",
  description: "Is the Bible historically accurate? Archaeological evidence, manuscript reliability, contradictions, and authorship -- answered honestly by a pastor who takes both the text and the questions seriously.",
  url: "https://www.livewellbyjamesbell.co/faq/is-the-bible-historically-accurate",
  author: { "@type": "Person", name: "James Bell", url: "https://www.livewellbyjamesbell.co/about" },
  publisher: { "@type": "Organization", name: "LiveWell by James Bell" },
};

export default function IsBibleHistoricallyAccurate() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <Layout>
      <SEOMeta
        title="Is the Bible Historically Accurate? 8 Questions Answered"
        description="Is the Bible historically accurate? Archaeological evidence, manuscript reliability, contradictions, and authorship -- answered honestly by a pastor who takes both the text and the questions seriously."
        keywords="is the Bible historically accurate, Bible archaeology, Bible contradictions, who wrote the Bible, Bible manuscripts, Bible canon, Bible reliability"
        structuredData={[faqSchema, webPageSchema]}
      />

      <section style={{ background: "var(--charcoal)", padding: "clamp(80px,12vw,160px) 24px 64px", textAlign: "center" }}>
        <p style={{ fontFamily: "var(--U)", fontSize: "11px", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--mustard)", marginBottom: "24px" }}>PEOPLE ALSO ASK</p>
        <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(32px,5vw,60px)", fontWeight: 400, color: "var(--charcoal-fg)", maxWidth: "780px", margin: "0 auto", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          Is the Bible historically accurate?
        </h1>
        <p style={{ fontFamily: "var(--U)", fontSize: "16px", color: "rgba(255,255,255,0.6)", marginTop: "32px", maxWidth: "560px", marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>
          The evidence is stronger than skeptics admit and more complex than fundamentalists want. Here is what we actually know.
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
            The full article traces the manuscript evidence, the archaeological record, and the scholarly consensus with the rigor these questions deserve.
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
              { label: "Can science and faith coexist?", href: "/faq/can-science-and-faith-coexist" },
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
