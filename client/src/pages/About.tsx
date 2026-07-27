import Layout from "@/components/Layout";
import { SEOMeta } from "@/components/SEOMeta";
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { SITE_STATS } from "@/config/siteStats";
import { SITE_URL } from "@/lib/site";
import { PullQuote, StatementBand, SectionArt } from "@/components/EditorialBlocks";
import { Figure } from "@/components/Figure";
import { SKEPTIC_TRACK_LIVE } from "@/lib/skepticTrack";
import FollowJames from "@/components/FollowJames";
import { SAME_AS } from "@/lib/channels";

const PORTRAIT = "https://d2xsxph8kpxj0f.cloudfront.net/310519663366638960/KoRED62UaUJB6FH9jFpuEG/IMG_4533_137f3486.jpeg";

const PATHWAYS = [
  { href: "/skeptic-track", label: "If you are not sure you believe any of this", desc: "Start with the track written for skeptics, by someone who used to be one. No tricks, no altar call at the end. Just your questions taken seriously." },
  { href: "/writing", label: "If your faith has outgrown the answers you were given", desc: "Read the essays. They start at the root instead of the symptom, and they leave open the things that should stay open." },
  { href: "/pastors", label: "If you carry a church", desc: "The pastors section and the Pastors Connection Network exist because the loneliest job in the building is the one standing up front." },
  { href: "/leadership", label: "If you lead and teach", desc: "A working library on preaching, reading Scripture, and forming leaders. Built to be used, not admired." },
  { href: "/marriage", label: "If your marriage needs more than tips", desc: "Writing on covenant for two people still keeping a promise they are no longer sure they understand." },
  { href: "/parenting", label: "If you are raising children", desc: "Five sons, and none of it theoretical. Formation over performance, and no formulas." },
];

export default function About() {
  return (
    <Layout>
      <SEOMeta
        title="About James Bell — Pastor, Author, Writer"
        description={`Pastor, author, and founder. Twelve years at First Baptist Church of Fenton, the Pastors Connection Network, and ENDS, equipping pastors in remote regions. ${SITE_STATS.bookCount} books on theology, church history, justice, and ordinary life.`}
        type="website"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: "James Bell",
          url: `${SITE_URL}/about`,
          jobTitle: "Lead Pastor, Author, Founder",
          description: `Lead Pastor at First Baptist Church of Fenton for twelve years, author of ${SITE_STATS.bookCountWord} books, founder of the Pastors Connection Network (nearly 18,000 pastors) and of ENDS, which equips pastors in remote regions around the world.`,
          worksFor: {
            "@type": "Organization",
            name: "First Baptist Church of Fenton",
          },
          sameAs: SAME_AS,
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
              <h1 style={{ fontFamily: "var(--F)", fontSize: "clamp(2rem, 4vw, 2.75rem)", fontWeight: 400, lineHeight: 1.1, letterSpacing: "-0.02em", color: "var(--bone)", marginBottom: "1rem" }}>James Bell</h1>
              <p style={{ fontSize: "0.875rem", color: "var(--bone)", opacity: 0.5, fontFamily: "var(--U)", lineHeight: 1.5 }}>
                Lead Pastor, First Baptist Church of Fenton<br />
                Founder, Pastors Connection Network<br />
                Founder, ENDS, equipping pastors in remote regions<br />
                Host, Following the Way<br />
                Author of {SITE_STATS.bookCount} books
              </p>
            </div>
          </div>

          <div className="article-body prose-section" style={{ color: "var(--bone)", opacity: 0.85 }}>
            <p>
              I pastor a church in Fenton, Michigan, and I write. Most weeks that is the whole job description.
            </p>
            <p>
              I was an atheist before I was a Christian. I bring it up because it changed how I write and not because I want to build a personality on it. Mostly it means I know what the objections sound like from the inside, and I am not willing to answer them with something thin. If you do not believe any of this, I am not going to pretend your reasons are stupid.
            </p>
            <p>
              The rest is fairly ordinary. I have five sons. I have been at the same church long enough to have buried people I loved and married their children. Almost everything I write started as something I had to figure out for an actual person sitting across from me, usually on a week when I did not feel qualified to answer.
            </p>
          </div>
        </div>
      </section>

      <StatementBand tone="light" width="38ch">
        Theology is only worth anything if it holds up on a Tuesday afternoon.
      </StatementBand>

      {/* THE CHURCH AND THE NETWORK */}
      <section style={{ background: "var(--bone)", padding: "var(--s-6) var(--s-3)" }}>
        <div style={{ maxWidth: "var(--w-prose)", margin: "0 auto" }}>
          <div style={{ width: "40px", height: "2px", background: "var(--mustard)", marginBottom: "2rem" }} />
          <h2 style={{ fontFamily: "var(--F)", fontSize: "1.75rem", fontWeight: 400, color: "var(--ink)", marginBottom: "1.5rem" }}>The church, the network, and the nationals</h2>
          <div className="article-body prose-section">
            <p>
              I have pastored First Baptist Church of Fenton, Michigan for twelve years. I put that first not as a line on a resume but because it is the room where everything here gets tested. These essays were not written in a quiet study with the commentaries open and the whole afternoon free. They were written around hospital visits and budget meetings, after funerals, in the days on either side of the counseling appointments where what a person believes about God either holds or it comes apart. Twelve years in that room will take the abstraction out of almost anyone.
            </p>
            <p>
              I started the Pastors Connection Network for a fairly simple reason. Pastors are some of the least cared-for people in the church. They hand out grace all week and rarely get handed any back. They carry things people have told them that they can never repeat to anyone. PCN now connects nearly eighteen thousand pastors to each other and to resources built by someone who knows that particular weight from the inside, because when the man up front quietly comes apart on a Saturday night, a whole congregation feels it on Sunday morning.
            </p>
            <p>
              I also founded ENDS, which equips pastors in remote regions around the world. Not to send Americans to do their work for them, and not to hand them a translated version of our assumptions. To put real training in the hands of the men already there, who already know the language and the terrain and the cost, and who will still be there long after any visitor has gone home.
            </p>
            <p>
              The rest of it is writing. {SITE_STATS.bookCount} books so far, on theology, church history, justice, marriage, parenting, and the slow unglamorous business of following Jesus over a long stretch of time. The essays here. The <a href="http://followingthewaypodcast.com/" target="_blank" rel="noopener noreferrer">Following the Way</a> podcast, and the notes I write most days for whoever is reading. It is really all one project: taking the depth of theology and putting it back in contact with the weight of an ordinary life.{" "}
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
          <h2 style={{ fontFamily: "var(--F)", fontSize: "1.75rem", fontWeight: 400, color: "var(--bone)", marginBottom: "2.5rem" }}>Begin where you actually are</h2>

          {PATHWAYS.filter((p) => SKEPTIC_TRACK_LIVE || p.href !== "/skeptic-track").map((p) => (
            <Link key={p.href} href={p.href} style={{ display: "block", textDecoration: "none", padding: "1.5rem 0", borderBottom: "1px solid rgba(244,241,234,0.12)" }}>
              <div style={{ fontFamily: "var(--F)", fontSize: "1.2rem", fontWeight: 400, color: "var(--bone)", marginBottom: "0.4rem" }}>
                {p.label} <ArrowRight size={15} style={{ display: "inline", verticalAlign: "middle", color: "var(--mustard)" }} />
              </div>
              <div style={{ fontSize: "0.9rem", lineHeight: 1.6, color: "var(--bone)", opacity: 0.55 }}>{p.desc}</div>
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
          <p style={{ fontFamily: "var(--F)", fontSize: "1.125rem", lineHeight: 1.65, color: "var(--bone)", fontStyle: "italic", marginBottom: "2rem" }}>
            You may still be deciding whether to trust the voice. That is the right instinct, and you should keep it. The writing will either carry weight for you or it will not, and I would rather you find that out for yourself than be talked into it. Begin where you actually are.
          </p>
          <Link href="/writing" style={{ fontFamily: "var(--U)", fontSize: "0.875rem", fontWeight: 500, color: "var(--mustard)", textDecoration: "none", borderBottom: "1px solid var(--mustard)", paddingBottom: "0.25rem" }}>
            Read the writing <ArrowRight size={14} style={{ display: "inline", verticalAlign: "middle" }} />
          </Link>
        </div>
      </section>
      <FollowJames />
    </Layout>
  );
}
