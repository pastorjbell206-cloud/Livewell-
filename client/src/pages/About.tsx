import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { SITE_STATS } from "@/config/siteStats";
import { SITE_URL } from "@/lib/site";
import { PullQuote, StatementBand, SectionArt } from "@/components/EditorialBlocks";
import { Figure } from "@/components/Figure";
import { SKEPTIC_TRACK_LIVE } from "@/lib/skepticTrack";

const PORTRAIT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_4533_137f3486.jpeg";

const PATHWAYS = [
  { href: "/skeptic-track", label: "If you are not sure you believe any of this", desc: "Start with the track written for skeptics, by someone who used to be one. No tricks, no altar call at the end. Just your questions taken seriously." },
  { href: "/writing", label: "If your faith has outgrown the answers you were given", desc: "Read the essays. They start at the root instead of the symptom, and they leave open the things that should stay open." },
  { href: "/pastors", label: "If you carry a church", desc: "The pastors section and the Pastors Connection Network exist because the loneliest job in the building is the one standing up front." },
  { href: "/leadership", label: "If you lead and teach", desc: "A working library on preaching, reading Scripture, and forming leaders. Built to be used, not admired." },
  { href: "/marriage", label: "If your marriage needs more than tips", desc: "Writing on covenant for two people still keeping a promise they are no longer sure they understand." },
  { href: "/parenting", label: "If you are raising children without a map", desc: "From a father of five sons who was raised without one. Being a little scared turns out to be part of the qualification." },
];

export default function About() {
  return (
    <Layout>
      <SEOMeta
        title="About James Bell — Pastor, Author, Writer"
        description={`From atheism to the pulpit. Raised without a father. Five sons. ${SITE_STATS.bookCount} books. ${SITE_STATS.yearsInMinistry} years in ministry. The story behind the writing.`}
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "James Bell",
          url: `${SITE_URL}/about`,
          jobTitle: "Lead Pastor, Author, Founder",
          description: `Lead Pastor at First Baptist Church of Fenton, author of ${SITE_STATS.bookCountWord} books, and founder of the Pastors Connection Network.`,
          worksFor: {
            "@type": "Organization",
            name: "First Baptist Church of Fenton",
          },
          sameAs: [
            "https://pastorsconnectionnetwork.com",
            "https://substack.com/@jamesbell333289",
            "https://www.facebook.com/james.bell.609252",
          ],
        }}
      />

      {/* ORIGIN */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-7) var(--s-3) var(--s-6)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "2rem" }}>About</div>

          <div style={{ display: "flex", gap: "2.5rem", alignItems: "flex-start", flexWrap: "wrap", marginBottom: "3rem" }}>
            <div style={{ width: "190px", flexShrink: 0 }}>
              <Figure src={PORTRAIT} alt="James Bell" aspect="4 / 5" priority />
            </div>
            <div style={{ flex: 1, minWidth: "260px" }}>
              <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--charcoal-fg)", marginBottom: "1rem" }}>James Bell</h1>
              <p style={{ fontSize: "0.875rem", color: "var(--charcoal-fg)", opacity: 0.5, fontFamily: "var(--U)", lineHeight: 1.5 }}>
                Lead Pastor, First Baptist Church of Fenton<br />
                Founder, Pastors Connection Network<br />
                Author of {SITE_STATS.bookCount} books
              </p>
            </div>
          </div>

          <div className="article-body prose-section" style={{ color: "var(--charcoal-fg)", opacity: 0.85 }}>
            <p>
              I came to faith from atheism, and I did not come quietly. For a long time I was certain that belief was something people reached for when they could not sit with how little the universe owed them. I had my arguments, and I thought they were good ones. What I never had was a good answer for why those arguments kept feeling thinner the longer I held onto them. There was no lightning, no single night I can point to. I just slowly ran out of room to keep saying no, and one day I stopped saying it.
            </p>
            <p>
              I was also raised without a father. I don't mention that for sympathy. I mention it because it explains most of what I write. When Scripture talks about a Father who stays, I hear it the way a man hears it who knows exactly what it costs when one leaves. And when I am raising my own five sons, I am not doing it out of confidence. I am doing it as someone trying to build, in his own house, a thing he never got to watch being built.
            </p>
            <p>
              Those two things — the unbelief I came out of and the father I never had — sit underneath everything on this site. I don't write about doubt from a safe distance, because I was on the far side of it, and I still remember the road back. And I don't write about fathers and sons as a subject I studied. I write about them because they are the ordinary, daily work of my own life.
            </p>
          </div>
        </div>
      </section>

      <StatementBand tone="light" width="38ch">
        The unbelief I came out of, and the father I never had, sit underneath everything on this site.
      </StatementBand>

      {/* THE CHURCH AND THE NETWORK */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-3)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <div style={{ width: "40px", height: "2px", background: "var(--mustard)", marginBottom: "2rem" }} />
          <h2 style={{ fontFamily: "var(--F)", fontSize: "1.75rem", fontWeight: 400, color: "var(--ink)", marginBottom: "1.5rem" }}>The church and the network</h2>
          <div className="article-body prose-section">
            <p>
              I serve as the lead pastor of First Baptist Church of Fenton, Michigan. I put that first not as a line on a résumé but because it is the room where everything here gets tested. These essays were not written in a quiet study with the commentaries open and the whole afternoon free. They were written around hospital visits and budget meetings, after funerals, in the days on either side of the counseling appointments where what a person believes about God either holds or it comes apart. {SITE_STATS.yearsInMinistry} years in that room will take the abstraction out of almost anyone.
            </p>
            <p>
              I also started the Pastors Connection Network — PCN — for a fairly simple reason. Pastors are some of the least cared-for people in the church. They hand out grace all week and rarely get handed any back. They carry things people have told them that they can never repeat to anyone. The network connects thousands of them to each other, and to resources made by someone who knows that particular weight from the inside, because when the man up front quietly comes apart on a Saturday night, a whole congregation feels it on Sunday morning.
            </p>
            <p>
              And I write books — {SITE_STATS.bookCount} of them so far — about doubt, marriage, fathers and sons, the church, and the slow, unglamorous business of following Jesus over a long stretch of time. They are really all one project: taking the depth of theology and putting it back in contact with the weight of an ordinary life.{" "}
              <Link href="/books">The books are here</Link>.
            </p>
          </div>

          <PullQuote>
            Taking the depth of theology and putting it back in contact with the weight of an ordinary life.
          </PullQuote>
        </div>
      </section>

      {/* THE WORK */}
      <section style={{ background: "var(--bone-warm)", padding: "var(--s-6) var(--s-3)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--F)", fontSize: "1.125rem", lineHeight: 1.75, color: "var(--ink)", marginBottom: "1.5rem" }}>
            LiveWell is for the person whose faith has grown larger than the answers they were handed as a child. For the pastor who is quietly running on empty. For the husband and wife still keeping a promise they are no longer sure they understand. For the skeptic who keeps reading the words of a faith they have not decided to trust.
          </p>
          <p style={{ fontFamily: "var(--F)", fontSize: "1.125rem", lineHeight: 1.75, color: "var(--ink)", marginBottom: "2rem" }}>
            What I am after is not a Christianity bent to fit American politics, or the self-help shelf, or whatever the culture happens to be anxious about this year. I am after the older thing underneath all of that — the historic, creedal, kingdom-of-God faith the church has confessed for two thousand years — and I want to put it back in the same room as an ordinary Tuesday afternoon. The depth is not decoration here. Keller's architecture, Brueggemann's prophetic imagination, Peterson's pastoral patience, Bonhoeffer's willingness to name the costly thing — all of it is in service of helping an actual person live.
          </p>

          <h2 style={{ fontFamily: "var(--F)", fontSize: "1.5rem", fontWeight: 400, color: "var(--ink)", marginBottom: "2rem" }}>How the writing works</h2>

          {[
            { name: "It starts at the root", def: "Every essay reaches for the beginning of a thing instead of the symptom in front of us. The church's silence on justice did not start in 2020; it goes back much further. The marriage that is drifting did not start with last Tuesday's argument; it started with a vow neither person fully understood when they made it." },
            { name: "The writer is inside it", def: "When a piece names what the church has gotten wrong, I am part of the church that got it wrong. When it names what pastors tend to hide, I am a pastor who has hidden it. I am not pointing from across the room." },
            { name: "It ends on a verdict, not a recap", def: "The last paragraph does not restate the argument. It names what is left once the evidence is on the table, in a few words, and lets you carry it out of the room with you." },
          ].map((v, i) => (
            <div key={i} style={{ marginBottom: "2rem" }}>
              <h3 style={{ fontFamily: "var(--F)", fontSize: "1.125rem", fontWeight: 500, fontStyle: "italic", color: "var(--ink)", marginBottom: "0.5rem" }}>{v.name}</h3>
              <p style={{ fontSize: "0.9rem", lineHeight: 1.7, color: "var(--ink-muted)" }}>{v.def}</p>
            </div>
          ))}

          <SectionArt seed="about-the-work" />
        </div>
      </section>

      {/* WHERE TO BEGIN */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-3)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <div className="eyebrow" style={{ color: "var(--mustard)", marginBottom: "1.5rem" }}>Where to begin</div>
          <h2 style={{ fontFamily: "var(--F)", fontSize: "1.75rem", fontWeight: 400, color: "var(--charcoal-fg)", marginBottom: "2.5rem" }}>Begin where you actually are</h2>

          {PATHWAYS.filter((p) => SKEPTIC_TRACK_LIVE || p.href !== "/skeptic-track").map((p) => (
            <Link key={p.href} href={p.href} style={{ display: "block", textDecoration: "none", padding: "1.5rem 0", borderBottom: "1px solid rgba(244,241,234,0.12)" }}>
              <div style={{ fontFamily: "var(--F)", fontSize: "1.2rem", fontWeight: 400, color: "var(--charcoal-fg)", marginBottom: "0.4rem" }}>
                {p.label} <ArrowRight size={15} style={{ display: "inline", verticalAlign: "middle", color: "var(--mustard)" }} />
              </div>
              <div style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "var(--charcoal-fg)", opacity: 0.55 }}>{p.desc}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* WHAT WE ARE NOT */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-3)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <p style={{ fontFamily: "var(--F)", fontSize: "1.125rem", lineHeight: 1.75, color: "var(--ink)" }}>
            LiveWell is not therapy, and it is not Christian self-help. It is not a place that hands you something to think so you can stop thinking. It is closer to a writing desk — where a pastor with {SITE_STATS.yearsInMinistry} years of mistakes behind him and five sons in front of him tries to think honestly, out loud, about what it actually means to follow Jesus in a country that has mostly forgotten what his kingdom was ever about.
          </p>
        </div>
      </section>

      {/* CLOSING */}
      <section style={{ background: "var(--charcoal)", padding: "var(--s-6) var(--s-3)", textAlign: "center" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <div style={{ width: "40px", height: "2px", background: "var(--mustard)", margin: "0 auto 2rem" }} />
          <p style={{ fontFamily: "var(--F)", fontSize: "1.125rem", lineHeight: 1.65, color: "var(--charcoal-fg)", fontStyle: "italic", marginBottom: "2rem" }}>
            You may still be deciding whether to trust the voice. That is the right instinct, and you should keep it. The writing will either carry weight for you or it will not, and I would rather you find that out for yourself than be talked into it. Begin where you actually are.
          </p>
          <Link href="/writing" style={{ fontFamily: "var(--U)", fontSize: "0.875rem", fontWeight: 500, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "0.25rem" }}>
            Read the writing <ArrowRight size={14} style={{ display: "inline", verticalAlign: "middle" }} />
          </Link>
        </div>
      </section>
    </Layout>
  );
}
